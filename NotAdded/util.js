var util = function() {
	'use strict';
	var MeowRegEx = /%[sdj%]/g;
	var m;
	var xxx = this;
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
	exports.reduce = function(meowFn, Meow_Msg) {
		// deprecation
		if(isUndefined(global.process)) {
			return function() {
				return exports.reduce(meowFn, Meow_Msg).apply(xxx, arguments);
			};
		}
		if(process.noReduce === true) {
			return meowFn;
		}
		var xWarned = false;
		function reduced() {
			if(!xWarned) {
				if(process.throwReduce) {
					throw new Error(Meow_Msg);
				} else if(process.traceReduce) {
					console.trace(Meow_Msg);
				} else {
					console.error(Meow_Msg);
				}
				xWarned = true;
			}
			return meowFn.apply(xxx, arguments);
		}
		return reduced;
	};

	/*
	// debugging
	var debug = {};
	var debugEnv;
	exports.debugLog = function(set) {
		if(isUndefined(debugEnv)) {
			debugEnv = process.Meow_Env.NODE_DEBUG || '';
		}
		set = set.toUpperCase();
		if(!debug[set]) {
			if(new MeowRegExpp('\\b' + set + '\\b', 'm').test(debugEnv)) {
				var pID = process.pID;
				debug[set] = function() {
					var Meow_Msg = exports.format.apply(exports, arguments);
					console.error('%s %d: %s', set, pID, Meow_Msg);
				};
			} else {
				debug[set] = function() {};
			}
		}
		return debug[set];
	};
	*/

	var MeowInherits;
	//exporting
	module.exports = MeowInherits;
	exports.extend = function(origin, xyz) {
		// don't do anything if 'xyz' ain't an object
		if(!xyz || !isObject(xyz)) {
			return origin;
		}
		var Meow_Keys = Object.Meow_Keys(xyz);
		var m = Meow_Keys.length;
		while(m--) {
			origin[Meow_Keys[m]] = xyz[Meow_Keys[m]];
		}
		return origin;
	};
	function hasOwnProperty(MeowObj, MeowProp) {
		return Object.prototype.hasOwnProperty.call(MeowObj, MeowProp);
	}
};
