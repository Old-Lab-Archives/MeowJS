var meowSVG_FastScroll = function() {
	"use strict";
	var Meow_Power = this;
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
		}
	);
};
