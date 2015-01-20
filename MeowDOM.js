var MeowDOM = (function() {
	'use strict';
	var document;
	var Meow_DOMencode = function() {
	MeowDOM.Meow_DOMencode = function(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.appendChild(document.createTextNode(Meow_String));
		Meow_String = Meow_div.Meow_innerHTML;
		Meow_div = null;
		return Meow_String;
	};
	Meow_DOMencode.Meow_DOMdecode = function(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.Meow_innerHTML = Meow_String;
		Meow_String = Meow_div.Meow_innerText || Meow_div.Meow_TextContent;
		Meow_div = null;
		return Meow_String;
	}; };
	MeowDOM.prototype.Meow_Init = function(meowCallback) {
		var Meow_Power = this;
		var err, window;
		if(err) {
			return meowCallback(err);
		}
		Meow_Power.window = window;
		meowCallback(null);
	};
	/*
	MeowDOM.prototype.Meow_DOMRender = function(Meow_innerHTML, MeowStream, box) {
		//TODO
	}
	*/
}(document));
