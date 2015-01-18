var MeowUTF = function() {
// main file
'use strict';
// UTF8_16
var MeowUTF8_16 = (function(Meow_Global) {
	var Meow_Power, Meow_Args, define;
	if(!Array.Meow_isArray) {
		Array.Meow_isArray = function(vvv) {
			return Object.prototype.toString.call(vvv) === "[Object Array]";
		};
	}
	var Meow_StringFromCharCode = String.fromCharCode;
	MeowUTF8_16.Meow_ArraySrc = function(i) {
		if(!Array.Meow_isArray(i)) {
		throw Error("Illegal argument -- " +(typeof i));
		}
		var m = 0;
		return function() {
			return m >= i.length ? null : i[m++];
		};
	};
	MeowUTF8_16.Meow_ArrayDest = function(i) {
		if(!Array.Meow_isArray(i)) {
			throw Error("Illegal argument -- " +(typeof i));
		}
		return Array.prototype.push.bind(i);
	};
	MeowUTF8_16.Meow_StrSrc = function(mm) {
		if(typeof mm !== 'string') {
			throw Error("Illegal argument -- " +(typeof mm));
		}
		var m = 0;
		return function() {
			return m >= mm.length ? null : mm.charCodeAt(m++);
		};
	};
	MeowUTF8_16.Meow_StrDest = function() {
		var emm = [], fmm = [];
		return function() {
			if(Meow_Args.length === 0) {
				return fmm.join('')+Meow_StringFromCharCode.apply(String, emm);
			}
			if(emm.length + Meow_Args.length > 1024) {
				fmm.push(Meow_StringFromCharCode.apply(String, emm));
				emm.length = 0;
				Array.prototype.push.apply(emm, Meow_Args);
			}
		};
	};
	MeowUTF8_16.Meow_AssertCharCode = function(e) {
		if(typeof e !== 'number' || e !== e) {
			throw Error("Illegal CharCode--- " +(typeof e));
		}
		if(e < 0 || e > 0XFFFF) {
			throw Error("Illegal CharCode--- " +e);
		}
		return e;
	};
	MeowUTF8_16.Meow_AssertCodePt = function(ef) {
		if(typeof ef !== 'number' || ef !== ef) {
			throw Error("Illegal CodePoint-- " +(typeof ef));
		}
		if(ef < 0 || ef > MeowUTF8_16.Meow_MaxCodePt) {
			throw Error("Illegal CodePoint-- " +ef);
		}
		return ef;
	};
	MeowUTF8_16.Meow_FromCodePoint = function(Meow_Args) {
		var mmee;
		var m = 0;
		var efmm = Meow_Args;
		var c = efmm.length;
		MeowUTF8_16.MeowUTF8To16(function() {
			return m < c ? MeowUTF8_16.Meow_AssertCodePt(efmm[m++]) : null;
		}, mmee = MeowUTF8_16.Meow_StrDest());
		return mmee();
	};
	MeowUTF8_16.Meow_CodePtAt = function(mm, m) {
		if((typeof mm !== 'string' && !(mm && mm instanceof String)) || typeof m !== 'number') {
			throw Error("Illegal argument -- " +(typeof mm)+", "+(typeof m));
		}
		var c, ef;
		if(m < 0 || m >= (c = mm.length)) {
			return;
		}
		MeowUTF8_16.MeowUTF8To16 = (function() {
			return typeof ef === 'undefined' && m < c ? mm.charCodeAt(m++) : null;
		}, function(mef) {
			ef = mef;
		});
		return ef;
	};
	MeowUTF8_16.Meow_Polyfill = function(Meow_Override) {
		if(!String['Meow_FromCodePoint'] || Meow_Override) {
			String['Meow_FromCodePoint'] = MeowUTF8_16.Meow_FromCodePoint;
		}
		if(!String.prototype['Meow_CodePtAt'] || Meow_Override) {
			String.prototype['Meow_CodePtAt'] = function(m) {
				return MeowUTF8_16.Meow_CodePtAt(Meow_Power, m);
			};
		}
		return MeowUTF8_16;
	};
	if(typeof module === 'object' && module && module['exports']) {
		module['exports'] = MeowUTF8_16;
	} else if(typeof define === 'function' && define['amd']) {
		define(MeowUTF8_16);
	} else {
		if(!Meow_Global['MeowUTF816']) {
			Meow_Global['MeowUTF816']['MeowUTF8_16'] = MeowUTF8_16;
		}
	}
}(Meow_Power, String));
// End

// Reverse UTF16
var Meow_ReverseUTF16 = function() {
	var Meow_MinHigh = '\uD800';
	var Meow_MaxHigh = '\uDBFF';
	var Meow_MinLow = '\uDC00';
	var Meow_MaxLow = '\uDFFF';
	Meow_ReverseUTF16.export = function(Meow_String) {
		var Meow_Out = new Array(Meow_String.length);
		var Meow_HasSub = false;
		var Meow_Mid = Meow_String.length >> 1;
		var m, n, e1, e2;
		for(m = 0, n = Meow_String.length - 1; n >= Meow_Mid; m++, n--) {
			e1 = Meow_String[m];
			e2 = Meow_String[n];
			Meow_Out[m] = e1;
			Meow_Out[n] = e2;
			if(!Meow_HasSub) {
				Meow_HasSub = (e1 >= Meow_MinHigh) && (e1 <= Meow_MaxLow) || (e2 >= Meow_MinHigh) && (e2 <= Meow_MaxLow);
			}
		}
		if(Meow_HasSub) {
			for(m = 0; m < Meow_Out.length; m++) {
				e1 = Meow_Out[m];
				if(e1 >= Meow_MinLow && e1 <= Meow_MaxLow) {
					e2 = Meow_Out[m + 1];
					if(e2 >= Meow_MinHigh && e2 <= Meow_MaxHigh) {
						Meow_Out[m + 1] = e1;
						Meow_Out[m] = e2;
					}
				}
			}
		}
		return Meow_Out.join('');
	};
};
// End
};
