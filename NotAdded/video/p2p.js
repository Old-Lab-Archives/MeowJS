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
			var speedReportInterval = setInterval(x.bind(ig.speedReport, ig), 1000);
			ig.ws = new WebSocket((location.protocol === 'https:' ? 'wss://': 'ws://')+location.host+'/room/ws');
			ig.ws.onOpen = x.bind(ig.onWsOpen, ig);
			ig.ws.onMessage = x.bind(ig.onWsMessage, ig);
		},
		newLink: function(meta, callback) {
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
			var i;
			var temp = [];
			for(m = 0; m < ig.meta.pieceCount; m++) {
				temp.push(0);
			}
			x.each(this.peerList, function (value, key) {
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
		//
		// Still more to code!
		//
	};
});
