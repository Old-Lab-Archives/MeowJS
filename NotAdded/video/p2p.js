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
			ig.ws = new WebSocket((location.protocol == 'https:' ? 'wss://': 'ws://')+location.host+'/room/ws');
			ig.ws.onOpen = x.bind(ig.onWsOpen, ig);
			ig.ws.onMessage = x.bind(ig.onWsMessage, ig);
		},
		//
		// Still more to code
		//
	};
});
