var meowSVG_Loader = function() {
	"use strict";
	// MeowJS Fast Scroller
	var meowSVG_FastScroll = function() {
	var Meow_Power = this;
	var Meow_Loc;
	meowSVG_FastScroll('a[href*=#]:not([href=#]').click(function() {
		if(Meow_Loc.pathname.replace(/^\//,'') === Meow_Power.pathname.replace(/^\//,'')) {
			var Meow_Target = meowSVG_FastScroll(Meow_Power.hash);
			Meow_Target = Meow_Target.length ? Meow_Target : meowSVG_FastScroll('[name=' + Meow_Power.hash.slice(1) + ']');
			if(Meow_Target.length) {
				meowSVG_FastScroll('html, body').Meow_Animate({
					Meow_ScrollTop: Meow_Target.Meow_Offset().top }, 1000);
				return false;
				}
			}
		});
	};
	// End of MeowJS Fast Scroller

	// Checks if a string/buffer is SVG or not
	module.exports = function(StrOrBuf) {
		return /<svg[^>]*>/.test(StrOrBuf);
	};
	//
};
