var MeowWebRTC = function() {
	'use strict';
	// MeowWebRTC Audio
var MeowWebRTC_audio;
MeowWebRTC.MeowWebRTC_audio= x(document).ready(function() {
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	var MeowStream = {};
	var MeowPeer = {};
	var MeowCall = {};
	navigator.getUserMedia( {audio: true},
		// callback success
		function(xStream) {
			MeowStream = xStream;
			MeowPeer = new MeowPeer1({Meow_Key: ''});
			MeowPeer.on('open', function(Meow_ID) {
				x('#id').text('Your ID is ' +Meow_ID);
			});
			//
			// Still more to code
			//
		});
	});
};
