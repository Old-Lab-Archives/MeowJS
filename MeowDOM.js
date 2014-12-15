var MeowDOM = (function() {
	function Meow_DOMencode(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.appendChild(document.createTextNode(Meow_String));
		Meow_String = Meow_div.innerHTML;
		Meow_div = null;
		return Meow_String;
	}
	Meow_DOMencode.Meow_DOMdecode = function(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.innerHTML = Meow_String;
		Meow_String = Meow_div.innerText || Meow_div.Meow_TextContent;
		Meow_div = null;
		return Meow_String;
	};
	return (Meow_DOMencode.Meow_DOMencode = Meow_DOMencode);
}(document));
