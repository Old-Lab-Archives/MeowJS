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
			  0XD62F105D, 0X02441453, 0XD8A1E681, 0XE7D3FBC8;
			  0X21E1CDE6, 0XC33707D6, 0XF4D50D87, 0X455A14ED,
			  0XA9E3E905, 0XFCEFA3F8, 0X676F02D9, 0X8D2A4C8A,
			  0XFFFA3942, 0X8771F681, 0X6D9D6122, 0XFDE5380C,

			  // still coding now... will be updated
	];
});
