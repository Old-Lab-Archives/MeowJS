var define;
define(['peer', 'wsPeer', 'httpPeer', 'sys', 'xx'], function(peer, hpeer, wsPeer, sys) {
	var ig = this;
	var x;
	var WebSocket, location;
	function sum(list) {
		return x.reduce(list, function (memo, num) {
			return memo + num;
		}, 0);
	}
	function now() {
		return (new Date()).getTime();
	}
	function client() {
		ig.blockPerConnect = 1;
		ig.connectLimit = 20;
		ig.chkPendingInterval = 10 * 1000; // => 10s
		ig.init();
	}
	client.prototype = {
		init: function() {
			ig.peerID = null;
			ig.meta = null;
			ig.file = null;
			ig.ws = null;
			ig.peers = {};
			ig.ready = false;
			ig.inUsePeer = {};
			ig.badPeer = {};
			ig.blockedPeer = {};
			ig.pieceQueue = [];
			ig.finishedPiece = [];
			ig.finishedBlock = [];
			ig.pendingBlock = {};
			ig.blockChunks = {};
			ig.sent = 0;
			ig.received = 0;
			ig.peerTrans = {};
			ig.lastSpeedReport = now();
			var speedReportInterval;
			speedReportInterval = setInterval(x.bind(ig.speedReport, ig), 1000);
			ig.ws = new WebSocket((location.protocol === 'https:' ? 'wss://': 'ws://')+location.host+'/link/ws');
			ig.ws.onOpen = x.bind(ig.onWsOpen, ig);
			ig.ws.onMessage = x.bind(ig.onWsMessage, ig);
		},
		newLink: function(meta) {
			ig.ws.send(JSON.stringify({
				cmd: 'newLink',
				meta: meta
			}));
		},
		enterLink: function(linkID) {
			ig.ws.send(JSON.stringify({
				cmd: 'enterLink',
				linkID: linkID
			}));
		},
		httpPeerAdd: function(url) {
			ig.ws.send(JSON.stringify({
				cmd: 'httpPeerAdd',
				url: url,
				bitmap: client.finishedPiece.join('')
			}));
		},
		updatePeerList: function() {
			ig.ws.send(JSON.stringify({
				cmd: 'getPeerList'
			}));
		},
		updateBitmap: function() {
			ig.ws.send(JSON.stringify({
				cmd: 'updateBitmap',
				bitmap: client.finishedPiece.join('')
			}));
		},
		strength: function() {
			if(!ig.meta) {
				return 0;
			}
			var m;
			var temp = [];
			for(m = 0; m < ig.meta.pieceCount; m++) {
				temp.push(0);
			}
			x.each(this.peerList, function (value) {
				for(m = 0; m < ig.meta.pieceCount; m++) {
					temp[m] += (value.bitmap[m] === '1' ? 1 : 0);
				}
			});
			var min = x.min(temp);
			return min+(x.filter(temp, function (num) {
				return num > min;
			}).length / temp.length);
		},
		// exporting
		onReady: function() {
			console.log('onReady');
		},
		onMeta: function(meta) {
			console.log('onMeta', meta);
		},
		onPeerList: function(peerList) {
			console.log('onPeerList', peerList);
		},
		onPeerConnect: function(peer) {
			console.log('onNewPeer', peer);
		},
		onPeerDisconnect: function(peer) {
			console.log('onNewPeer', peer);
		},
		onPiece: function(piece) {
			console.log('onPiece', piece);
		},
		onFinished: function() {
			console.log('onFinished');
		},
		onSpeedReport: function(report) {
			console.log('onSpeedReport', report);
		},
		ensureConnection: function(peerID, connect) {
			if(ig.peers[peerID]) {
				return ig.peers[peerID];
			} else {
				var p;
				if(peerID.indexOf('http:') === 0 || peerID.indexOf('https:') === 0) {
					p = new hpeer.peer(peerID, ig);
				} else if(peerID.indexOf('ws:') === 0 || peerID.indexOf('wss:') === 0) {
					p = new wsPeer.peer(peerID, ig);
				} else {
					p = new peer.peer(ig.ws, ig.peerID, peerID);
				}
				p.peerTransID = x.uniqueID('peer');

				ig.inUsePeer[peerID] = 0;
				ig.peers[peerID] = p;

				p.onMessage = x.bind(function (data) {
					if(x.isObject(data) || data.indexOf('{') === 0) {
						var msg = x.isObject(data) ? data : JSON.parse(data);
						if(msg.cmd === 'requestBlock') {
							ig.sendBlock(p, msg.piece, msg.block);
						} else if(msg.cmd === 'block') {
							ig.receiveBlock(p, msg.piece, msg.block, msg.data);
						}
					} else {
						var pieceBlock = data.slice(0, data.indexOf('|')).split(',');
						data = data.slice(data.indexOf('|')+1);
						ig.receiveBlock(p, parseInt(pieceBlock[0], 10), parseInt(pieceBlock[1], 10), data);
					}
				}, ig);
				p.onClose = x.bind(function() {
					console.log('peer connect with '+peerID+' disconnected;');
					ig.removePending(peerID);
					delete ig.peers[peerID];
					if(x.isFunction(ig.onPeerDisconnect)) {
						ig.onPeerDisconnect(p);
					}
				}, ig);
				if(connect) {
					p.connect();
				}
				if(x.isFunction(ig.onPeerConnect)) {
					console.log('new connect to '+peerID);
					ig.onPeerConnect(p);
				}
				return p;
			}
		},
		sendBlock: function(peer, piece, block) {
			if(!ig.file) {
				return;
			} if(ig.finishedPiece[piece] !== 1) {
				return;
			}
			var start = ig.meta.pieceSize * piece + ig.meta.blockSize * block;
			ig.file.readAsBinaryString(start, start+ig.meta.blockSize, function (data) {
				peer.send(''+piece+','+block+'|'+data);
			});
		},
		requestBlock: function(peer, piece, block) {
			ig.inUsePeer[peer.id] += 1;
			ig.pendingBlock[piece][block] = peer.id;
			peer.send({
				cmd: 'requestBlock',
				piece: piece,
				block: block
			});
		},
		speedReport: function() {
			x.map(x.value(this.peers), function (peer) {
				ig.peerTrans[peer.peerTransID] = {
					sent: peer.sent(),
					received: peer.received()
				};
			});
			var sent = sum(x.pluck(x.value(ig.peerTrans), 'sent')) || 0;
			var received = sum(x.pluck(x.value(ig.peerTrans), 'received')) || 0;
			if(x.isFunction(ig.onSpeedReport)) {
				var elapsed = (now() - ig.lastSpeedReport) / 1000;
				ig.onSpeedReport({
					send: (sent - ig.sent) / elapsed,
					sent: sent,
					receive: (received - ig.received) / elapsed,
					received: received
				});
			}
			ig.sent = sent;
			ig.received = received;
			ig.lastSpeedReport = now();
		},
		pickupBlock: function() {
			if(x.isEmpty(ig.pieceQueue)) {
				return null;
			}
			var m, m2;
			var blockCount = Math.ceil(1.0 * ig.meta.pieceSize / ig.meta.blockSize);
			for(m = 0; m < ig.pieceQueue.length; m++) {
				var piece = ig.pieceQueue[m];
				// initiating if it's a new piece
				if(ig.blockChunks[piece] === undefined) {
					ig.blockChunks[piece] = [];
					ig.finishedBlock[piece] = [];
					ig.pendingBlock[piece] = [];
					for(m = 0; m < blockCount; ++m) {
						ig.finishedBlock[piece][m] = 0;
						ig.pendingBlock[piece][m] = 0;
					}
				}
				for(m2 = 0; m2 < blockCount; ++m2) {
					if(ig.finishedBlock[piece][m2] || ig.pendingBlock[piece][m2]) {
						continue;
					}
					return [piece, m2];
				}
			}
			return null;
		},
		findAvailablePeer: function(piece) {
			var peers = [];
			for(var key in ig.peerList) {
				if(key === ig.peerID) {
					continue;
				} if(ig.peerList[key].bitmap[piece] && (!x.has(ig.inUsePeer, key) || ig.inUsePeer[key] < ig.blockPerConnect) && !x.blockedPeer[key]) {
					peers.push(key);
				}
			}
			if(peers.length === 0) {
				return null;
			} else if(peers.length === 1) {
				return peers[0];
			}
			var peersScore = x.map(peers, function (key) {
				return (ig.badPeer[key] || 0) * 1000 + (ig.peers[key] ? 0 : 1) * 100 + (ig.inUsePeer[key] || 0) * 10;
			});
			var temp = [];
			var minScore = x.min(peersScore);
			for(var m = 0; m < peers.length; m++) {
				if(peersScore[m] === minScore) {
					temp.push(peers[m]);
				}
			}
			return temp[x.random(temp.length-1)];
		},
		startProcess: x.throttle(function() {
			while(x.size(ig.inUsePeer) < ig.connectLimit && ig.startProgress())
			{}
		}, 100),
		startProgress: function(block) {
			// pickup block
			var pieceBlock = ig.pickupBlock();
			if(pieceBlock === null) {
				return false;
			}
			var piece = pieceBlock[0];
			block = pieceBlock[1];
			// finding available peer
			var bestPeer = ig.findAvailablePeer(piece);
			if(bestPeer === null) {
				return false;
			}
			var peer = ig.ensureConnection(bestPeer, true);
			// marking
			ig.requestBlock(peer, piece, block);
			// Setting timeout for block
			//abandon all pending block when one is timeout
			x.delay(x.bind(ig.chkPending, ig, bestPeer, piece, block, peer.received(), ig.received, now()), ig.chkPendingInterval * 2);
			return true;
		},
		//
		// Still more to code!
		//
	};
});
