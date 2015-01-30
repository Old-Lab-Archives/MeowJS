var util = function() {
	'use strict';
	var MeowRegEx = /%[sdj%]/g;
	var m;
	exports.format = function(fo) {
		if(!meowIsStr(fo)) {
			var objects = [];
			for(m = 0; m < arguments.length; m++) {
				objects.push(inspect(arguments[m]));
			}
			return objects.join(' ');
		}
		m = 1;
		var Meow_Args = arguments;
		var Meow_Len = Meow_Args.length;
		var Meow_String = String(fo).replace(MeowRegEx, function(x) {
			if(x === '%%') {
				return '%';
			} if(m >= Meow_Len) {
				return x;
			} switch(x) {
				case '%s':
				return String(Meow_Args[m++]);
				case '%d':
				return Number(Meow_Args[m++]);
				case '%j':
				try {
					return JSON.stringify(Meow_Args[m++]);
				} catch(e) {
					return '[Circular]';
				}
				break;
				default:
				return x;
			}
		});
		for(var x = Meow_Args[m]; m < Meow_Len; x = Meow_Args[++m]) {
			if(isNull(x) || !isObject(x)) {
				Meow_String += ' ' + x;
			} else {
				Meow_String += ' ' + inspect(x);
			}
		}
		return Meow_String;
	};
	//
	// Still more to code
	//
};
