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

	// Still coding now... Will be updated soon! (^_^)
}
