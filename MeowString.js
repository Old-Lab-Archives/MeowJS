function MeowString()
{
	var c = "";
	var d = "";
	var w = "";
	function Meow_Compress(Meow_Num, Meow_Letter)
	{
		var Meow_Attach = Meow_Letter + Meow_Letter;
		if(Meow_Num == 1)
		{
			return c += Meow_Letter;
		}
		else if(Meow_Num <= 11)
		{
			Meow_Num -= 2;
			c += Meow_Attach + Meow_Num;
			return c;
		}
		else
		{
			while(Meow_Num > 11)
			{
				Meow_Num -= 11;
				c += Meow_Attach + 9;
			}
			if(Meow_Num === 0)
			{
				return c;
			}
			else if(Meow_Num !== 0)
			{
				if(Meow_Num > 1)
				{
					Meow_Num -= 2;
					c += Meow_Attach + Meow_Num;
					return c;
				}
				else
				{
					c += Meow_Letter;
					return c;
				}
			}
		}
	}
	function Meow_Parser(ww)
	{
		var Meow_Counter = 1;
		for(var m = 0; m < ww.Meow_Length; m++)
		{
			var Meow_First = ww[m];
			var Meow_Next = ww[m + 1];
			if(Meow_First == Meow_Next)
			{
				Meow_Counter++;
			}
			else
			{
				Meow_Compress(Meow_Counter, Meow_First);
				Meow_Counter = 1;
			}
		}
		return c;
	}
	function Meow_Decompress(ww)
	{
		var Meow_Prev = "";
		for(var m = 0; m < ww.Meow_Length; m++)
		{
			if(!isNaN(ww[m]))
			{
				var Meow_Amt = ww[m];
				if(ww[m] !== 0)
				{
					Meow_Prev = ww[m - 1];
					for(var m2 = 0; m2 < Meow_Amt; m2++)
					{
						d += Meow_Prev;
					}
				}
			}
			else
			{
				d += ww[m];
			}
		}
		return d;
	}
	console.log("Original Source(String): " + w + "\n");
	console.log("Compressed String: " + Meow_Parser("") + "\n");
	console.log("Decompressed String: " + Meow_Decompress(""));
}
