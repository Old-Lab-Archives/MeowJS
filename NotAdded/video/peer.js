var define;
define(function() {
	var browser = null;
	var window;
	var ig = this;
	if(window.mozRTCPeerConnection) {
		browser = 'moz';
		window.RTCPeerConnection = mozRTCPeerConnection;
		window.RTCSessionDescription = mozRTCSessionDescription;
		window.RTCIce = mozRTCIce;
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
			ig.pcConfig = {
				iceServers: [{
					url: "stun:23.21.150.121"
				}]
			};
		} else if(browser === 'webkit') {
			ig.pcConfig = {
				iceServers: [{
					url: "stun:stun.l.google.com:19302"
				}]
			};
		}

		//
		// still more to code..
		//
	}
});
