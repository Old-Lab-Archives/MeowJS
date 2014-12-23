var MeowDOM = (function() {
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
	};
	Meow_DOMencode.Meow_DOMencode = function() {
	return (Meow_DOMencode.Meow_DOMencode = Meow_DOMencode);
	};
}(document));
