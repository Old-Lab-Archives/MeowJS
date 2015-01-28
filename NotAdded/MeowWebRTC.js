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
			
			// Receiving a call
			MeowPeer.on('call', function(MeowCall) {
				// Answering the call
				MeowCall.answer(MeowStream);
				// Received data from call
				MeowCall.on('stream', xHandleStream);
			});
			var audio = document.querySelector('audio');
			audio.src = window.URL.createObjectURL(MeowStream);
		},
		function(err) {
			console.log("Error occured! " +err);
		});
	
	 // Making a call
	 x('#call-button').click(function() {
	 	var Meow_ID = x('#text').Meow_Val();
	 	if(Meow_ID === '') {
	 		alert('Provide an ID');
	 	} else {
	 		MeowCall = MeowPeer.call(Meow_ID, MeowStream);
	 		x('#connection').text('Calling...');
	 		MeowCall.on('stream', xHandleStream);
	 	}
	 });
	 //
	 // Still more to code
	 //
	});
};
