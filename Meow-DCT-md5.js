function Meow_DCT_md5()
{
	var Meow_md5 = function(Meow_String)
	{
		function Meow_RotateLeft(Meow_RVal, Meow_ShiftBits)
		{
			return (Meow_RVal << Meow_ShiftBits) | (Meow_RVal >>> (32 - Meow_ShiftBits));
		}
		function Meow_AddUnsigned(U, V)
		{
			U4 = (U & 0X40000000);
			V4 = (V & 0X40000000);
			U8 = (U & 0X80000000);
			V8 = (V & 0X80000000);
			ROutput = (U & 0X3FFFFFFF) + (V & 0X3FFFFFFF);
			if(U4 & V4)
			{
				return (ROutput ^ 0X80000000 ^ U8 ^ V8);
			}
			if(U4 | V4)
			{
				if(ROutput & 0X40000000)
				{
					return (ROutput ^ 0XC0000000 ^ U8 ^ V8);
				}
				else
				{
					return (ROutput ^ 0X40000000 ^ U8 ^ V8);
				}
			}
			else
			{
				return(ROutput ^ U8 ^ V8);
			}
		}
		function P(l, m, n)
		{
			return (l & m) | ((~l) & n);
		}
		function Q(l, m, n)
		{
			return (l & n) | (m & (~n));
		}
		function R(l, m, n)
		{
			return (l ^ m ^ n);
		}
		function S(l, m, n)
		{
			return (m ^ (l | (~n)));
		}
		function PP(ii, jj, kk, ll, mm, nn, oo)
		{
			ii = Meow_AddUnsigned(ii, Meow_AddUnsigned(Meow_AddUnsigned(P(jj, kk, ll), mm), oo));
				return Meow_AddUnsigned(Meow_RotateLeft(ii, nn), jj);
		}
		function QQ(ii, jj, kk, ll, mm, nn, oo)
		{
			ii = Meow_AddUnsigned(ii, Meow_AddUnsigned(Meow_AddUnsigned(Q(jj, kk, ll), mm), oo));
			return Meow_AddUnsigned(Meow_RotateLeft(ii, nn), jj);
		}
		function RR(ii, jj, kk, ll, mm, nn, oo)
		{
			ii = Meow_AddUnsigned(ii, Meow_AddUnsigned(Meow_AddUnsigned(R(jj, kk, ll), mm), oo));
			return Meow_AddUnsigned(Meow_RotateLeft(ii, nn), jj);
		}
		function SS(ii, jj, kk, ll, mm, nn, oo)
		{
			ii = Meow_AddUnsigned(ii, Meow_AddUnsigned(Meow_AddUnsigned(S(jj, kk, ll), mm), oo));
			return Meow_AddUnsigned(Meow_RotateLeft(ii, nn), jj);
		}
		function Meow_ConvertToWordArray(Meow_String)
		{
			var Meow_WordCount;
			var Meow_MessageLength = Meow_String.length;
			var Meow_NumOfWordsTmp1 = Meow_MessageLength + 8;
			var Meow_NumOfWordsTmp2 = (Meow_NumOfWordsTmp1 - (Meow_NumOfWordsTmp1 % 64)) / 64;
			var Meow_NumOfWords = (Meow_NumOfWordsTmp2 + 1) * 16;
			var Meow_WordArray = Array(Meow_NumOfWords - 1);
			var Meow_BytePos = 0;
			var Meow_ByteCount = 0;
			while(Meow_ByteCount < Meow_MessageLength)
			{
				Meow_WordCount = (Meow_ByteCount - (Meow_ByteCount % 4)) / 4;
				Meow_BytePos = (Meow_ByteCount % 4) * 8;
				Meow_WordArray[Meow_WordCount] = (Meow_WordArray[Meow_WordCount] | (Meow_String.charCodeAt(Meow_ByteCount) << Meow_BytePos));
				Meow_ByteCount++;
			}
			Meow_WordCount = (Meow_ByteCount - (Meow_ByteCount % 4)) / 4;
			Meow_BytePos = (Meow_ByteCount % 4) * 8;
			Meow_WordArray[Meow_WordCount] = Meow_WordArray[Meow_WordCount] | (0X80 << Meow_BytePos);
			Meow_WordArray[Meow_NumOfWords - 2] = Meow_MessageLength << 3;
			Meow_WordArray[Meow_NumOfWords - 1] = Meow_MessageLength >>> 29;
			return Meow_WordArray;
		}
		function Meow_ConvertWordToHex(Meow_RVal)
		{
			var Meow_ConvertWordToHexVal = "", Meow_ConvertWordToHexValTmp = "", Meow_RByte, Meow_RCount;
			for(Meow_RCount = 0; Meow_RCount <= 3; Meow_RCount++)
			{
				Meow_RByte = (Meow_RVal >>> (Meow_RCount * 8)) & 255;
				Meow_ConvertWordToHexValTmp = "0" + Meow_RByte.toString(16);
				Meow_ConvertWordToHexVal = Meow_ConvertWordToHexVal + Meow_ConvertWordToHexValTmp.substr(Meow_ConvertWordToHexValTmp.length - 2, 2);
			}
			return Meow_ConvertWordToHexVal;
		}
		function Meow_UTF8Encode(Meow_String)
		{
			Meow_String = Meow_String.replace(/\r\n/g, "\n");
			var Meow_UTFtext = "";
			for(var x = 0; x < Meow_String.length; x++)
			{
				var m4 = Meow_String.charCodeAt(x);
				if(m4 < 128)
				{
					Meow_UTFtext += String.fromCharCode(m4);
				}
				else if((m4 > 127) && (m4 < 2048))
				{
					Meow_UTFtext += String.fromCharCode((m4 >> 6) | 192);
					Meow_UTFtext += String.fromCharCode((m4 & 63) | 128);
				}
				else
				{
					Meow_UTFtext += String.fromCharCode((m4 >> 12) | 224);
					Meow_UTFtext += String.fromCharCode(((m4 >> 6) & 63) | 128);
					Meow_UTFtext += String.fromCharCode((m4 & 63) | 128);
				}
			}
			return Meow_UTFtext;
		}
		var xxx = Array();
		var m3, iii, jjj, kkk, lll, ii, jj, kk, ll;
		var N11 = 7, N12 = 12, N13 = 17, N14 = 22;
		var N21 = 5, N22 = 9, N23 = 14, N24 = 20;
		var N31 = 4, N32 = 11, N33 = 16, N34 = 23;
		var N41 = 6, N42 = 10, N43 = 15, N44 = 21;
		Meow_String = Meow_UTF8Encode(Meow_String);
		xxx = Meow_ConvertToWordArray(Meow_String);
		ii = 0X67452301; jj = 0XEFCDAB89; kk = 0X98BADCFE; ll = 0X10325476;

		// Still coding now... Will be updated soon! (^_^)
	};
}
