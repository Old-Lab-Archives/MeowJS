window.Meow_VideoSemantics = (function(window, document, undefined) {
	'use strict';
	var Meow_Power = function() {
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
