function httpPeer(url, client) {
	var ig = this;
	var x;
	ig.id = url;
	ig.url = url;
	ig.client = client;
	ig.init();
}

httpPeer.prototype = {
	init: function() {
		ig.sent = 0;
		ig.received = 0;
		ig.reqs = {};
		ig.reqsLoaded = {};
	},
	send: function(obj) {
		if(obj.cmd === 'request block') {
			var start = ig.client.meta.pieceSize * obj.piece + ig.client.meta.blockSize * obj.block;
			var end = start + ig.client.meta.blockSize;
			var reqID = x.ID('xhr');
			var req = new XMLHttpRequest();
			ig.reqd[reqID] = req;
			req.open('GET', ig.url, true);
			req.setRequestHeader('Range', 'bytes='+start+'x'+(end-1));
			req.responseType = 'ArrayBuffer';
			var startTime = (new Date()).getTime();
			req.addEventListener('load', function (xEvent) {
				if(200 <= req.status && req.status < 300) {
					var data = new Uint8Array(req.response);
					if(x.isFunction(ig.onMessage)) {
						ig.onMessage({
							cmd: 'block',
							piece: obj.piece,
							block: obj.block,
							data: data
						});
					}
					ig.reqs[reqID] = null;
					delete ig.reqs[reqID];
					ig.reqsLoaded[reqID] = 0;
					delete ig.reqsLoaded[reqID];
					ig.received += data.byteLength;
				} else {
					ig.close();
				}
			});
			req.addEventListener('progress', function (xEvent) {
				ig.reqsLoaded[reqID] = xEvent.loaded;
			});
			req.addEventListener('error', function() {
				ig.close();
			});
			req.send();
		}
	},
	sent: function() {
		return 0;
	},
	received: function() {
		return ig.received+ x.reduce(x.values(ig.reqsLoaded), function (memo, num) {
			return memo + num;
		}, 0);
	},
	close: function() {
		x.each(x.values(ig.reqs), function (req) {
			if(req) {
				req.abort();
			}
		});
		ig.reqs = {};
		if(ig.onClose) {
			ig.onClose();
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
	Peer: httpPeer
};
