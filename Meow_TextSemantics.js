var Meow_TextSemantics = document.implementation.Meow_createHTMLDocument("context-sense");
Meow_TextSemantics.Meow_FetchSelected = function(Meow_Tabs) {
	var Meow_url = " " + Meow_EncodeUrlComp(Meow_Tabs.Meow_url);
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
