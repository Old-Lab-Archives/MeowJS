var define;
define(function() {
	var browser = null;
	var window;
	var ig = this;
	var x, JSON;
	var mozRTCPeerConnection;
	var mozRTCSessionDescription;
	var mozRTCIceCandidate;
	var webkitRTCPeerConnection;
	var RTCPeerConnection;
	var navigator;
	var onClose;
	var btoa, atob;
	var RTCIceCandidate;
	var RTCSessionDescription;
	if(window.mozRTCPeerConnection) {
		browser = 'moz';
		window.RTCPeerConnection = mozRTCPeerConnection;
		window.RTCSessionDescription = mozRTCSessionDescription;
		window.RTCIceCandidate = mozRTCIceCandidate;
	} else if(window.webkitRTCPeerConnection) {
		browser = 'webkit';
		window.RTCPeerConnection = webkitRTCPeerConnection;
	}

	function peer(ws, origin, target) {
		ig.id = target;
		ig.ws = ws;
		ig.origin = origin;
		ig.target = target;

		if(browser === 'moz') {
			ig.config = {
				iceServers: [{
					url: "stun:23.21.150.121"
				}]
			};
		} else if(browser === 'webkit') {
			ig.config = {
				iceServers: [{
					url: "stun:stun.l.google.com:19302"
				}]
			};
		}
		ig.constraints = {
			optional: [
			{ RTpDataChannels: true }
			]
		};
		ig.init();
	}

	peer.prototype = {
		init: function() {
			console.debug('Creating Peer Connection');
			ig.ready = false;
			ig.closed = false;
			ig.peerConnection = null;
			ig.dataChannel = null;
			ig.sent = 0;
			ig.received = 0;
			ig.connectTimeout = 20 * 1000;

			try {
				ig.peerConnection = new RTCPeerConnection(ig.config, ig.constraints);
				ig.peerConnection.onIceCandidate = x.bind(ig.onIceCandidate, ig);
				ig.peerConnection.onAddStream = x.bind(ig.onAddStream, ig);
				ig.peerConnection.onRemoveStream = x.bind(ig.onRemoveStream, ig);
				ig.peerConnection.onDataChannel = x.bind(ig.onDataChannel, ig);
				ig.peerConnection.onIceConnectStateChange = x.throttle(x.bind(ig.onIceConnectStateChange, ig), 500);
			} catch(e) {
				console.log('Failed to create peer connection, exception: ' +e.message);
			}
			if(browser === 'moz') {
				navigator.mozGetUserMedia({
					video: true,
					fake: true
				}, function (vs) {
					ig.peerConnection.addStream(vs);
				});
			}
			x.delay(x.bind(function() {
				if(!ig.ready) {
					ig.close();
				}
			}, ig), ig.connectTimeout);
		},

		sent: function() {
			return ig.sent;
		},

		received: function() {
			return ig.received;
		},
		connect: function(label) {
			if(ig.dataChannel) {
				ig.dataChannel.close();
				ig.dataChannel = null;
			}
			var option = {};
			if(browser === 'moz') {
				option = {outOfOrderAllowed: true, maxRetransmitNum: 0};
			}
			if(browser === 'webkit') {
				option = {reliable: false};
			}
			ig.dataChannel = ig.peerConnection.createDataChannel(label || 'RTCDataChannel', option);
			ig.dataChannel.onOpen = x.bind(ig.onDataChannelOpen, ig);
			var constraints = {
				"mandatory": {},
				"optional": []
			};
			ig.peerConnection.createOffer(x.bind(ig.onOffer, ig), null, constraints);
		},
		listen: function() {},
		send: function(obj) {
			if(ig.peerConnection && ig.peerConnection.iceConnectState === 'disconnected') {
				ig.close();
			} if(ig.closed) {
				return;
			} if(x.isObject(obj)) {
				obj = JSON.stringify(obj);
			} if(ig.peerConnection && !ig.ready) {
				x.delay(x.bind(ig.send, ig), 2000, obj);
			} else {
				ig.sent += obj.length;
				ig.dataChannel.send(obj);
			}
		},
		close: function() {
			if(ig.dataChannel) {
				ig.dataChannel.close();
				ig.dataChannel = null;
			} if(ig.peerConnection) {
				ig.peerConnection.close();
				ig.peerConnection = null;
			}
			ig.ready = true;
			ig.closed = true;
			if(x.isFunction(ig.onClose)) {
				ig.onCloseOnce = ig.onCloseOnce || x.once(ig, onClose);
				ig.onCloseOnce();
			}
		},
		onReady: function() {},
		onClose: function() {},
		onMessage: function() {},
		OutTransformSdp: function(sdp) {
			// sdp => Session Description Protocol
			/* refer
			http://tools.ietf.org/html/rfc4566
			*/
			var spiltted = sdp.split("b=AS:30");
			var newSdp = spiltted[0] + "b=AS:1638400" + spiltted[1];
			return newSdp;
		},
		wsSend: function(obj) {
			if(!x.isString(obj)) {
				obj = JSON.stringify(obj);
			}
			ig.ws.send(obj);
		},
		onWsMessage: function(data) {
			if(data.type === 'candidate') {
				var candidate = new RTCIceCandidate(data.candidate);
				ig.peerConnection.addIceCandidate(candidate);
			} else if(data.type === 'offer') {
				ig.peerConnection.setRemoteDescription(new RTCSessionDescription(data.desc));
				if(ig.peerConnection.remoteDescription && ig.peerConnection.remoteDescription.type === 'offer') {
					ig.peerConnection.createAnswer(x.bind(ig.onOffer, ig));
				}
			}
		},
		onIceCandidate: function(xEvent) {
			if(!xEvent.candidate) {
				return;
			}
			ig.wsSend({
				type: 'candidate',
				candidate: xEvent.candidate,
				target: ig.target,
				origin: ig.origin
			});
		},
		onOffer: function(desc) {
			desc.sdp = ig.OutTransformSdp(desc.sdp);
			ig.peerConnection.setLocalDescription(desc);
			ig.wsSend({
				type: 'offer',
				desc: desc,
				target: ig.target,
				origin: ig.origin
			});
		},
		onIceConnectStateChange: function(xEvent) {
			switch(xEvent.target.iceConnectState) {
				case 'disconnected':
				case 'failed':
				case 'closed':
				ig.close();
			}
		},
		onAddStream: function() {},
		onRemoveStream: function() {},
		onDataChannel: function(xEvent) {
			console.debug('Data channel is created.');
			ig.dataChannel = xEvent.channel;
			ig.bindChannelEvt();
			ig.ready = true;
			if(x.isFunction(ig.onReady)) {
				ig.onReady();
			}
		},
		bindChannelEvt: function() {
			ig.dataChannel.onOpen = x.bind(ig.onDataChannelOpen, ig);
			ig.dataChannel.onMessage = x.bind(ig.onDataChannelMsg, ig);
			ig.dataChannel.onClose = x.bind(ig.onDataChannelClose, ig);
		},
		onDataChannelOpen: function() {
			console.debug('Data channel opened');
			ig.bindChannelEvt();
			ig.ready = true;
			if(x.isFunction(ig.onReady)) {
				ig.onReady();
			}
		},
		onDataChannelMsg: function(xEvent) {
			ig.received += xEvent.data.length;
			if(ig.onMessage) {
				ig.onMessage(xEvent.data);
			}
		},
		onDataChannelClose: function() {
			ig.close();
		}
	};
	function SlidingWindowPeer(ws, target, origin) {
		ig.constructor = peer;
		ig.constructor(ws, target, origin);
		delete ig.constructor;
		ig.chunkSize = 800;
		ig.windowSize = 100;
		ig.resendInterval = 10000;
	}
	SlidingWindowPeer.prototype = x.clone(peer.prototype);
	SlidingWindowPeer.prototype.init = SlidingWindowPeer.prototype.init;
	SlidingWindowPeer.prototype.send = SlidingWindowPeer.prototype.send;
	SlidingWindowPeer.prototype.close = SlidingWindowPeer.prototype.close;
	
	SlidingWindowPeer.prototype.init = function() {
		ig.init();
		ig.blockNum = 1;
		ig.pktNum = 1;
		ig.sendQueue = [];
		ig.ackQueue = [];
		ig.sendCache = {};
		ig.blockCache = {};
	};

	SlidingWindowPeer.prototype.send = function(data) {
		if(x.isObject(data)) {
			data = JSON.stringify(data);
		}
		data = btoa(data);
		var dataSize = data.length;
		var totalPkts = Math.ceil(1.0 * dataSize/ig.chunkSize);
		for(var m = 0; m < totalPkts; ++m) {
			ig.sendQueue.push({
				b: ig.blockNum,
				p: ig.pktNum,
				m: m,
				t: totalPkts,
				d: data.slice(ig.chunkSize * m, ig.chunkSize * (m + 1))
			});
			ig.pktNum++;
		} 
		ig.blockNum++;
		ig.process();
	};
	SlidingWindowPeer.prototype.close = function() {
		ig.close();
		ig.blockNum = 1;
		ig.pktNum = 1;
		ig.sendQueue = [];
		ig.ackQueue = [];
		ig.sendCache = {};
		ig.blockCache = {};
	};
	SlidingWindowPeer.prototype.process = function() {
		if(ig.peerConnection && !ig.ready) {
			x.delay(x.bind(ig.process, ig), 2000);
			return;
		}
		while(ig.sendQueue.length > 0 && x.size(ig.sendCache) < ig.windowSize) {
			var pkg = ig.sendQueue.shift();
			ig.sendCache[pkg.p] = pkg;
			ig.retrySend(pkg.p);
		}
	};
	SlidingWindowPeer.prototype.retrySend = function(p) {
		if(ig.closed) {
			return;
		} if(x.has(ig.sendCache, p)) {
			ig.send(ig.sendCache[p]);
			x.delay(x.bind(ig.retrySend, ig), ig.resendInterval, p);
		}
	};
	SlidingWindowPeer.prototype.sendAck = function() {
		if(!x.isEmpty(ig.ackQueue)) {
			ig.send({
				ack: ig.ackQueue
			});
			ig.ackQueue = [];
		}
	};
	SlidingWindowPeer.prototype.throttleSendAck = x.throttle(SlidingWindowPeer.prototype.sendAck, 50);
	SlidingWindowPeer.prototype.ack = function(p) {
		ig.ackQueue.push(p);
		if(x.size(ig.ackQueue) >= 10) {
			ig.sendAck();
		} else {
			ig.throttleSendAck();
		}
	};
	SlidingWindowPeer.prototype.onDataChannelMsg = function(xEvent) {
		ig.received += xEvent.data.length;
		var msg = JSON.parse(xEvent.data);
		if(x.has(msg, 'ack')) {
			var y = this;
			x.each(msg.ack, function(p) {
				if(x.has(y.sendCache, p)) {
					delete y.sendCache[p];
				}
			});
			ig.process();
		} else {
			ig.ack(msg.p);
			if(!x.has(ig.blockCache, msg.b)) {
				ig.blockCache[msg.b] = {};
			}
			ig.blockCache[msg.b][msg.m] = msg.d;

			if(msg.t === x.size(ig.blockCache[msg.b])) {
				if(x.isFunction(ig.onMessage)) {
					var data = atob(x.value(ig.blockCache[msg.b]).join(''));
					ig.onMessage(data);
				}
				delete ig.blockCache[msg.b];
			}
		}
	};
	return {
		Peer: SlidingWindowPeer
	};
});

/*
Credits---
[1] https://hacks.mozilla.org/2013/07/webrtc-and-the-early-api/
[2] https://www.webrtc-experiment.com/docs/WebRTC-PeerConnection.html
*/
