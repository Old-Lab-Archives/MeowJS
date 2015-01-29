var util = function() {
	'use strict';
	var MeowRegEx = /%[sdj%]/g;
	exports.format = function(fo) {
		if(!MeowisStr(fo)) {
			var objects = [];
			for(var m = 0; m < arguments.length; m++) {
				objects.push(inspect(arguments[m]));
			}
			return objects.join(' ');
		}
		//
		// Still more to code
		//
	}
};
