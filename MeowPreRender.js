// JavaScript Document
var window, document, writeToHeader;
window.onload = function( ) {
var allLinks = document.getElementsByTagName("a");
var elToLoad = [];
for(var i = 0; i < allLinks.length; i++){
	var checkAttr = allLinks[i].getAttribute("pre");
	if(checkAttr!=null){
		elToLoad.push(allLinks[i].href);
	}
}
writeToHeader(elToLoad);
};

writeToHeader = function(elToLoad){
	if(elToLoad.length > 0){
		for(var e = 0; e < elToLoad.length; e++){
			var ele_head = document.getElementsByTagName( 'head' )[0].firstChild;
			var el_towrite = document.createElement('link');
			var att1 = document.createAttribute("rel");
			att1.nodeValue = "prerender";
			var att2 = document.createAttribute("href");
			att2.nodeValue = elToLoad[e];
			el_towrite.setAttributeNode(att1);
			el_towrite.setAttributeNode(att2);
			ele_head.parentNode.insertBefore( el_towrite, ele_head );
		}
	}	
};
