var MeowWebRTC = function() {
	'use strict';
	// MeowWebRTC Audio
	var MeowWebRTC_audio;
	var window;
	var x;
	var document;
	var alert, URL;
	var navigator;
	MeowWebRTC_audio = x(document).ready(function() {
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	var MeowStream = function(Meow_Src) {
	module.exports = MeowStream;
	var Meow_Power = this;
	Meow_Power.source = Meow_Src;
	};
	var MeowPeer = {};
	var MeowCall = {};
	var MeowPeer1;
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
	 var xHandleStream;
	MeowWebRTC.xHandleStream = function(MeowPeerStream) {
	 	x('#connection').text('connected-to-peer');
	 	var MeowPeerAudio = x('#peer-audio');
	 	MeowPeerAudio.attr('src', URL.createObjectURL(MeowPeerStream));
	 	MeowPeerAudio.get(0).play();
	 };
	 x('#audio-format').submit(function(format) {
	 	var artist = x(format.target)[0][0].value;
	 	var track = x(format.target)[0][1].value;
	 	var year = x(format.target)[0][2].value;
	 	var url = x(format.target)[0][3].value;
	 	var html = '<h3>'+ url + '</h3>';
	 	html += '<h4>Artist: '+artist+ '</h4>';
	 	html += '<h4>Track: '+track+ '</h4>';
	 	html += '<h4>Year:' +year+ '</h4>';
	 	x('#song-info').meowAppend(html);
	 	return false;
	 	});
	});
};
