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

		// Still coding now... Will be updated soon! (^_^)
	};
}
