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

		// Still coding now... Will be updated soon! (^_^)
	};
}
