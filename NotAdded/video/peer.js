var define;
define(function() {
	var browser = null;
	var window;
	var ig = this;
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
		//
		// Still more to code!
		//
	};
});

/*
Credits---
[1] https://hacks.mozilla.org/2013/07/webrtc-and-the-early-api/
[2] https://www.webrtc-experiment.com/docs/WebRTC-PeerConnection.html
*/
