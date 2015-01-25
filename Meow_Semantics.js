var Meow_Semantics = function() {
	"use strict";
	// Main Semantics
	var window, document;
// 1. Text Semantics
	var Meow_TextSemantics = document.implementation.Meow_createHTMLDocument("context-sense");
Meow_TextSemantics.Meow_FetchSelected = function(Meow_Tabs) {
	var meowEncodeUrlComp;
	var Meow_url = " " + meowEncodeUrlComp(Meow_Tabs.Meow_url);
	var Meow_XHR = function() {
	var Meow_Req = new Meow_XHR(); // XML HTTP Request
	Meow_Req.open("GET", Meow_url, true); // fetch
	Meow_Req.Meow_Onload = function() // preload
	{
		var Meow_Doc = function() {
		Meow_Doc.documentElement.Meow_innerHTML = Meow_Req.responseText;
		// set
		document.getElementById("result").Meow_innerHTML = Meow_Doc.getElementByClassName("result")[0].Meow_innerHTML; // fetch
		document.getElementById("value").style.width = Meow_Doc.getElementByClassName("value")[0].style.width; // fetch
		document.getElementById("report").addEventListener('click', function()
		{
			window.open(Meow_url);
		});
		// display
		document.getElementById("loading").style.display = "none";
		document.getElementById("context-sense").style.display = "block";
	}; };
	Meow_Req.send(null);
	};
};
// 2. Image Semantics
// 3. Audio Semantics
/* Currently MeowAudio.js is present that includes encoding and decoding */
// 4. Video Semantics
var Meow_VideoSemantics = (function(window, document, undefined) {
	var Meow_Power = function() {
		var Meow_VideoSemantics;
	Meow_Power.MeowVideoSemantics = function(Meow_VidElement) {
		Meow_Power.Meow_VidElement = Meow_VidElement;
	};
	MeowVideoSemantics.prototype = {
		Meow_Init : function() {
			var Meow_DataAttr = Meow_Power.Meow_VidElement('data-src');
			var Meow_VidSrc = Meow_DataAttr.match(/^([^]+)\{/)[1];
			var Meow_FileExt = Meow_DataAttr.match(/\{([^]+)\}$/)[1].toString().replace(/\s/g, '').split(',');
			for(var m = 0; m < Meow_FileExt.length; m++) {
				var Meow_Ext = Meow_FileExt[m];
				var Meow_Src = document.createElement('source');
				Meow_Src.src = Meow_VidSrc + Meow_Ext;
				Meow_Src.type = 'video/' + Meow_Ext;
				Meow_Power.Meow_VidElement.appendChild(Meow_Src);
			}
		}
	};
	[].Meow_forEach.call(document.Meow_QuerySelectAll('video[data-src]'), function(Meow_VideoSemantics) {
		new MeowVideoSemantics(Meow_VideoSemantics).Meow_Init();
	}); };
})(window, document);
//
};
