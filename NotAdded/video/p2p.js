var p2p;
p2p(function() {
	var peer = ['peer.js'];
	var hpeer = ['httpPeer.js']; 
	var wsPeer = ['wsPeer.js']; 
	//var sys = ['sys.js'];
	var ig = this;
	var x = ['xx.js'];
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
			/*
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
			*/
			var location, WebSocket;
			ig.lastSpeedReport = now();
			var speedReportInterval;
			speedReportInterval = setInterval(x.bind(ig.speedReport, ig), 1000);
			ig.ws = new WebSocket((location.protocol === 'https:' ? 'wss://': 'ws://')+location.host+'/link/ws');
			ig.ws.onOpen = x.bind(ig.onWsOpen, ig);
			ig.ws.onMessage = x.bind(ig.onWsMessage, ig);
		},
		/*
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
		*/
		strength: function() {
			if(!ig.meta) {
				return 0;
			}
			var m;
			var temp = [];
			for(m = 0; m < ig.meta.pieceCount; m++) {
				temp.push(0);
			}
			x.each(ig.peerList, function (value) {
				for(m = 0; m < ig.meta.pieceCount; m++) {
					temp[m] += (value.bitmap[m] === '1' ? 1 : 0);
				}
			});
			var min = x.min(temp);
			return min+(x.filter(temp, function (num) {
				return num > min;
			}).length / temp.length);
		},
		/*
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
		*/
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
			x.map(x.value(ig.peers), function (peer) {
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
		chkPending: function(peerID, piece, block, lastReceived, totalReceived, lastTime) {
			if(ig.pendingBlock[piece] && ig.pendingBlock[piece][block] === peerID && ig.peers[peerID]) {
				var received = ig.peers[peerID].received();
				var speed = (received - lastReceived) / (now() - lastTime) * 1000;
				var globalSpeed = (ig.received - totalReceived) / (now() - lastTime) * 1000;
				if(speed > globalSpeed / x.size(ig.peers) / 4) {
					// quarter of the average speed
					x.delay(x.bind(ig.chkPending, ig, peerID, piece, block, received, ig.received, now()), ig.chkPendingInterval);
				} else {
					// timeout
					console.log('low download speed from '+peerID+'...', speed, globalSpeed);
					ig.badPeer[peerID] = ig.badPeer[peerID] || 0;
					ig.badPeer[peerID] += 1;
					// closing and blocking the peer for one block time
					ig.peers[peerID].close();
					ig.blockedPeer[peerID] = 998;
					x.delay(x.bind(function() {
						delete ig.blockedPeer[peerID];
						delete ig.inUsePeer[peerID];
						x.defer(x.bind(ig.startProcess, ig));
					}, ig), (ig.meta.blockSize / speed > 120 ? 120: ig.meta.blockSize / speed) * 1000);
				}
			}
		},
		removePending: function(peerID) {
			for(var p in ig.pendingBlock) {
				for(var b = 0; b < ig.pendingBlock[p].length; b++) {
					if(ig.pendingBlock[p][b] === peerID) {
						ig.pendingBlock[p][b] = 0;
					}
				}
			}
		}/*,
		onBlockFinished: function(piece) {
			// finished piece
			if(x.all(ig.finishedBlock[piece])) {
				var Blob;
				var blob = new Blob(ig.blockChunks[piece]);
				ig.file.write(blob, ig.meta.pieceSize * piece, function() {
					if(x.isFunction(ig.onPiece)) {
						ig.onPiece(piece);
					}
					x.defer(x.bind(ig.updateBitmap, ig));
					// check finished
					if(x.all(ig.finishedPiece) && x.isEmpty(ig.pieceQueue) && x.isFunction(ig.onFinished)) {
						ig.finishOnce = ig.finishOnce || x.once(ig.onFinished);
						ig.finishOnce();
					}
				});
				ig.finishedPiece[piece] = 1;
				if(ig.pieceQueue.indexOf(piece) !== -1) {
					ig.pieceQueue.splice(ig.pieceQueue.indexOf(piece), 1);
				}
				delete ig.blockChunks[piece];
				delete ig.finishedBlock[piece];
				delete ig.pendingBlock[piece];
			}
			x.defer(x.bind(ig.startProcess, ig));
		},
		onWsOpen: function() {},
		onWsMessage: function(xEvent) {
			var msg = JSON.parse(xEvent.data);
			if(!msg.cmd && msg.type && msg.origin) {
				var peer = ig.ensureConnection(msg.origin, false);
				peer.onWsMessage(msg);
			} else if(msg.cmd) {
				console.debug('p2p:', msg);
				switch (msg.cmd) {
					case 'peerID':
					ig.peerID = msg.peerID;
					ig.ready = true;
					if(x.isFunction(ig.onReady)) {
						ig.onReady();
					}
					break;
					case 'meta':
					if(ig.meta !== null) {
						break;
					}
					ig.meta = msg.meta;
					for(var m = 0; m < ig.meta.pieceCount; ++m) {
						ig.finishedPiece[m] = 0;
						ig.pieceQueue.push(m);
					}
					ig.file = new sys.file(ig.meta.size, function() {
						if(x.isFunction(ig.onMeta)) {
							ig.onMeta(ig.meta);
						}
					});
					break;
					case 'peerList':
					ig.peerList = msg.peerList;
					if(x.isFunction(ig.onPeerList)) {
						ig.onPeerList(ig.peerList);
					}
					break;
					default:
					break;
				}
			}
		} */
	};
	return {
		client: client
	};
});
