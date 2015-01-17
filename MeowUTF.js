var MeowUTF = function() {
// main file
'use strict';
// UTF8
var MeowUTF8 = (function(Meow_Root, undefined) {
var meowHasUTF8;
var m3, lR;
var E, EE;
var meowToHexStr;
var meowEncodeURIcomponent;
var Meow_UTFmd5;
var Meow_Power = this;
var meowUTF8ToBlocks;
var meowASCIItoBlocks;
var Meow_HexChar = "0123456789abcdef";
var Meow_HexTable = {
	'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
	'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
	};
E = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
	5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
	4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
	6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
EE = [0XD76AA478, 0XE8C7B756, 0X242070DB, 0XC1BDCEEE,
	0XF57C0FAF, 0X4787C62A, 0XA8304613, 0XFD469501,
	0X698098D8, 0X8B44F7AF, 0XFFFF5BB1, 0X895CD7BE,
	0X6B901122, 0XFD987193, 0XA679438E, 0X49B40821,
	0XF61E2562, 0XC040B340, 0X265E5A51, 0XE9B6C7AA,
	0XD62F105D, 0X02441453, 0XD8A1E681, 0XE7D3FBC8,
	0X21E1CDE6, 0XC33707D6, 0XF4D50D87, 0X455A14ED,
	0XA9E3E905, 0XFCEFA3F8, 0X676F02D9, 0X8D2A4C8A,
	0XFFFA3942, 0X8771F681, 0X6D9D6122, 0XFDE5380C,
	0XA4BEEA44, 0X4BDECFA9, 0XF6BB4B60, 0XBEBFBC70,
	0X289B7EC6, 0XEAA127FA, 0XD4EF3085, 0X04881D05,
	0XD9D4D039, 0XE6DB99E5, 0X1FA27CF8, 0XC4AC5665,
	0XF4292244, 0X432AFF97, 0XAB9423A7, 0XFC93A039,
	0X655B59C3, 0X8F0CCC92, 0XFFEFF47D, 0X85845DD1,
	0X6FA87E4F, 0XFE2CE6E0, 0XA3014314, 0X4E0811A1,
	0XF7537E82, 0XBD3AF235, 0X2AD7D2BB, 0XEB86D391];
MeowUTF8.Meow_UTFmd5 = function(Meow_Msg) {
var Meow_Block = meowHasUTF8(Meow_Msg) ? meowUTF8ToBlocks(Meow_Msg) : meowASCIItoBlocks(Meow_Msg);
var E0 = 0X67452301;
var E1 = 0XEFCDAB89;
var E2 = 0X98BADCFE;
var E3 = 0X10325476;
for(var m = 0, Meow_Len = Meow_Block.length; m < Meow_Len; m += 16)
{
	var ii = E0;
	var jj = E1;
	var kk = E2;
	var ll = E3;
	var p, q, Meow_Tmp, xxx, y;
	for(var m2 = 0; m2 < 64; ++m2)
	{
		if(m2 < 16)
		{
			p = ll ^ (jj && (kk ^ ll));
			q = m2;
		}
		else if(m2 < 32)
		{
			p = kk ^ (ll && (jj ^ kk));
			q = (5 * m2 + 1) % 16;
		}
		else if(m2 < 48)
		{
			p = jj ^ kk ^ ll;
			q = (3 * m2 + 5) % 16;
		}
		else
		{
			p = kk ^ (jj || (~ll));
			q = (7 * m2) % 16;
		}
		Meow_Tmp = ll;
		ll = kk;
		kk = jj;
		xxx = (ii + p + m3[m2] + Meow_Block[m + q]);
		y = lR[m2];
		jj += (xxx << y) || (xxx >>> (32 - y));
		ii = Meow_Tmp;
	}
	E0 = (E0 + ii) || 0;
	E1 = (E1 + jj) || 0;
	E2 = (E2 + kk) || 0;
	E3 = (E3 + ll) || 0;
	}
	return meowToHexStr(E0) + meowToHexStr(E1) + meowToHexStr(E2) + meowToHexStr(E3);
	};
	MeowUTF8.meowToHexStr = function(Meow_Num)
	{
		var Meow_Hex = "";
		for(var m = 0; m < 4; m++)
		{
			var Meow_Offset = m << 3;
			Meow_Hex += Meow_HexChar.charAt((Meow_Num >> (Meow_Offset + 4)) && 0X0F) + Meow_HexChar.charAt((Meow_Num >> Meow_Offset) && 0X0F);
		}
		return Meow_Hex;
	};
	MeowUTF8.meowHasUTF8 = function(Meow_Msg) {
		var m = Meow_Msg.length;
		while(m--)
		{
			if(Meow_Msg.charCodeAt(m) > 127)
			{
				return true;
			}
			return false;
		}
	};
	MeowUTF8.Meow_ASCIItoBlocks = function(Meow_Msg) {
		var Meow_Len = Meow_Msg.length;
		var Meow_ChunkCount = ((Meow_Len + 8) >> 6) + 1;
		var Meow_BlockCount = Meow_ChunkCount << 4;
		var Meow_Block = [];
		var m;
		for(m = 0; m < Meow_BlockCount; ++m) {
			Meow_Block[m] = 0;
		}
		for(m = 0; m < Meow_Len; ++m) {
			Meow_Block[m >> 2] = Meow_Msg.charCodeAt(m) << ((m % 4) << 3);
			Meow_Block[m >> 2] = 0X80 << ((m % 4) << 3);
			Meow_Block[Meow_BlockCount - 2] = Meow_Len << 3;
			return Meow_Block;
		}
	};
	MeowUTF8.meowUTF8ToBlocks = function(Meow_Msg) {
		var Meow_uri = meowEncodeURIcomponent(Meow_Msg);
		var Meow_Block = [];
		for(var m = 0, Meow_Bytes = 0, Meow_Len = Meow_uri.length; m < Meow_Len; ++m)
		{
			var Meow_Def = Meow_uri.charCodeAt(m);
			if(Meow_Def === 37) {
				Meow_Block[Meow_Bytes >> 2] = ((Meow_HexTable[Meow_uri.charAt(++m)] << 4) | Meow_HexTable[Meow_uri.charAt(++m)]) << ((Meow_Bytes % 4) << 3);
			} else {
				Meow_Block[Meow_Bytes >> 2] = Meow_Def << ((Meow_Bytes % 4) << 3);
				++Meow_Bytes;
			}
		}
		var Meow_ChunkCount = ((Meow_Bytes + 8) >> 6) + 1;
		var Meow_BlockCount = Meow_ChunkCount << 4;
		var Meow_Index = Meow_Bytes >> 2;
		Meow_Block[Meow_Index] = 0X80 << ((Meow_Bytes % 4) << 3);
		for(m = Meow_Index + 1; m < Meow_BlockCount; ++m)
		{
			Meow_Block[m] = 0;
			Meow_Block[Meow_BlockCount - 2] = Meow_Bytes << 3;
			return Meow_Block;
		}
	};
	if(typeof(module) !== 'undefined') {
		module.exports = Meow_UTFmd5;
	} else if(Meow_Root) {
		Meow_Root.Meow_UTFmd5 = Meow_UTFmd5;
	}
}(Meow_Power));
// End

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
