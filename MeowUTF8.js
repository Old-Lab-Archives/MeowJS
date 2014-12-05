var MeowUTF8 = (function(Meow_Root, undefined) {
'use strict';
var Meow_HexChar = "0123456789abcdef";
var Meow_HexTable = {
	'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
	'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15
	};
var E = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
	5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
	4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
	6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
var EE = [0XD76AA478, 0XE8C7B756, 0X242070DB, 0XC1BDCEEE,
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
var Meow_UTFmd5 = function(Meow_Msg) {
var Meow_Block = new Meow_HasUTF8(Meow_Msg) ? new Meow_UTF8toBlocks(Meow_Msg) : new Meow_ASCIItoBlocks(Meow_Msg);
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
			p = ll ^ (jj & (kk ^ ll));
			q = m2;
		}
		else if(m2 < 32)
		{
			p = kk ^ (ll & (jj ^ kk));
			q = (5 * m2 + 1) % 16;
		}
		else if(m2 < 48)
		{
			p = jj ^ kk ^ ll;
			q = (3 * m2 + 5) % 16;
		}
		else
		{
			p = kk ^ (jj | (~ll));
			q = (7 * m2) % 16;
		}
		Meow_Tmp = ll;
		ll = kk;
		kk = jj;
		xxx = (ii + p + m3[m2] + Meow_Block[m + q]);
		y = lR[m2];
		jj += (xxx << y) | (xxx >>> (32 - y));
		ii = Meow_Tmp;
	}
	E0 = (E0 + ii) | 0;
	E1 = (E1 + jj) | 0;
	E2 = (E2 + kk) | 0;
	E3 = (E3 + ll) | 0;
	}
	return new Meow_ToHexStr(E0) + new Meow_ToHexStr(E1) + new Meow_ToHexStr(E2) + new Meow_ToHexStr(E3);
	};
	var Meow_ToHexStr = function(Meow_Num)
	{

		// still coding now... will be updated soon!
	};
});
