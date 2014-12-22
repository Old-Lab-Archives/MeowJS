var MeowUTF8_16 = (function(Meow_Global, Meow_String) {
	"use strict";
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

		// Still coding... will be updated soon!
	};
});
