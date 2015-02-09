// wsPeer => Web Socket Peer
function wsPeer(url, client) {
	var ig = this;
	ig.id = url;
	ig.url = url;
	ig.client = client;
	ig.init();
}
var ig = this;
var WebSocket;
var x;
var Uint8Array, JSON;
wsPeer.prototype = {
	init: function() {
		ig.ws = null;
		ig.ready = false;
		ig.sent = 0;
		ig.received = 0;
		ig.ws = new WebSocket(ig.url);
		ig.ws.binaryType = 'ArrayBuffer';
		ig.ws.onOpen = x.bind(function() {
			ig.ready = true;
			if(x.isFunction(ig.onReady)) {
				ig.onReady();
			}
		}, ig);
		ig.ws.onMessage = x.bind(ig.onWsMessage, ig);
		ig.ws.onClose = x.bind(function() {
			ig.close();
		}, ig);
	},
	onWsMessage: function(xEvent) {
		ig.received += xEvent.data.byteLength || xEvent.data.length || 0;
		if(xEvent.data.length) {
			var msg = JSON.parse(xEvent.data);
			if(msg.cmd === 'start') {
				ig.array = [];
			} else if(msg.cmd === 'end') {
				var length = 0;
				x.each(ig.array, function (a) {
					length += a.byteLength;
				});
				var data = new Uint8Array(length);
				var pos = 0;
				x.each(ig.array, function (a) {
					data.set(a, pos);
					pos += a.byteLength;
				});
				if(x.isFunction(ig.onMessage)) {
					ig.onMessage({
						cmd: 'block',
						piece: msg.piece,
						block: msg.block,
						data: data
					});
					ig.array = [];
				}
			} else {
				ig.array.push(new Uint8Array(xEvent.data));
			}
		},
		send: function(obj) {
			if(!ig.ws || !ig.ready) {
				x.delay(x.bind(ig.send, ig), 2000, obj);
			} else {
				if(obj.cmd === 'request block') {
					var start = ig.client.meta.pieceSize * obj.piece + ig.client.meta.blockSize * obj.block;
					var end = start + ig.client.meta.blockSize;
					var data = JSON.stringify({
						start: start,
						end: end,
						piece: obj.piece,
						block: obj.block
					});
					ig.ws.send(data);
					ig.sent += data.length;
				}
			}
		},
		sent: function() {
			return ig.sent;
		},
		received: function() {
			return ig.received;
		},
		close: function() {
			if(ig.ws) {
				ig.ws.close();
				ig.ws = null;
			}
			if(x.isFunction(ig.onClose)) {
				ig.closeOnce = ig.closeOnce || x.once(ig.onClose);
				ig.closeOnce();
			}
		},
		connect: function() {},
		listen: function() {},
		onWsMessage: function() {},
		onReady: function() {},
		onClose: function() {},
		onMessage: function() {}
	};
	return {
		Peer: wsPeer
	};
};
