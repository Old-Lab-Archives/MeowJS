function MeowBinary()
{
	function Meow_Compress(Meow_Storage)
	{
		var Meow_Output = 0;
		var Meow_PredictPosVal = 1;
		var Meow_Len = Meow_Storage.Meow_Len;
		for(Meow_Def4 = 0; Meow_Def4 < Meow_Len; Meow_Def4++)
		{
			if(Meow_Storage[Meow_Def4] === true)
			{
				Meow_PredictVal = 1;
			}
			else
			{
				Meow_PredictVal = 0;
			}
			Meow_Output += Meow_PredictVal * Meow_PredictPosVal;
			Meow_PredictPosVal *= 2;
		}
		return Meow_Output;
	}
	function Meow_Decompress(Meow_Integer)
	{
		Meow_Output = [];
		var Meow_Flag = 0;
		Meow_PredictVal = false;
		Meow_Def4 = 0;
		while(true)
		{
			Meow_Flag = Meow_Integer % 2;
			if(Meow_Flag == 1)
			{
				Meow_PredictVal = true;
			}
			else
			{
				Meow_PredictVal = false;
			}
			Meow_Output[Meow_Def4] = Meow_PredictVal;
			Meow_Integer -= Meow_Flag;
			Meow_Integer /= 2;
			Meow_Def4++;
			if(Meow_Integer == 1)
			{
				Meow_Output[Meow_Def4] = true;
			}
			else if(Meow_Integer < 1)
			{
				return Meow_Output;
			}
		}
	}
}