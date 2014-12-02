function Meow_DCT_md5()
{
	var Meow_md5 = function(Meow_String)
	{
		function Meow_RotateLeft(Meow_RVal, Meow_ShiftBits)
		{
			return (Meow_RVal << Meow_ShiftBits) | (Meow_RVal >>> (32 - Meow_ShiftBits));
		}
		function Meow_AddUnsigned(1X, 1Y)
		{
			var 1X4, 1Y4, 1X8, 1Y8, ROutput;
			1X4 = (1X & 0X40000000);
			1Y4 = (1Y & 0X40000000);
			1X8 = (1X & 0X80000000);
			1Y8 = (1Y & 0X80000000);
			ROutput = (1X & 0X3FFFFFFF) + (1Y & 0X3FFFFFFF);
			if(1X4 & 1Y4)
			{
				return (ROutput ^ 0X80000000 ^ 1X8 ^ 1Y8);
			}
			else
			{
				return (ROutput ^ 0X40000000 ^ 1X8 ^ 1Y8);
			}
		}
		else
		{
			return(ROutput ^ 1X8 ^ 1Y8);
		}
	};
	function P(l, m, n)
	{
		return (l & m) | ((~l) & n);
	}

	// Still coding now... Will be updated soon! (^_^)
}
