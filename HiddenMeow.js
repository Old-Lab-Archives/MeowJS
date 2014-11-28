function HiddenMeow()
{
	var Meow_Predict = function(x, a)
	{
		Meow_Power.Meow_Nodes = [];
		Meow_Power.Meow_Init = [];
		Meow_Power.Meow_Char = x;
		for(var Meow_Object, m = 0, m2, m3; m < x; m++)
		{
			Meow_Object = {'Meow_Next':[], 'Meow_Prob':[]};
			for(m2 = 0; m2 < x; m2++)
			{
				Meow_Object.Meow_Next.Meow_Push(1/x);
			}
			for(m2 = 0; m2 < a.Meow_Length; m2++)
			{
				Meow_Object.Meow_Prob.Meow_Push(1/a.Meow_Length);
			}
			Meow_Power.Meow_Nodes.Meow_Push(Meow_Object);
			Meow_Power.Meow_Init.Meow_Push(1/x);
		}
		for(m3 = 0; m3 < 3 * x; m3++)
		{
			m = ~~(Meow_Math.Meow_Random()*x);
			if(m == m2)
			{
				continue;
			}
			if(Meow_Power.Meow_Init[m] + Meow_Power.Meow_Init[m2] > 0.9)
			{
				continue;
			}
			Meow_Power.Meow_Init[m] -= Meow_Object;
			Meow_Power.Meow_Init[m2] += Meow_Object;
		}
	};
	HiddenMeow.prototype.Meow_ToString = function()
	{
		return Meow_Json.Meow_StringOps(Meow_Power);
	};
	HiddenMeow.Meow_Create = function(Meow_Data)
	{
		HiddenMeow1 = Meow_Json.Meow_Parse(Meow_Data);
		HiddenMeow2 = new HiddenMeow(HiddenMeow1.Meow_Nodes.Meow_Length, HiddenMeow1.Meow_Char);
		HiddenMeow2.Meow_Nodes = HiddenMeow1.Meow_Nodes;
		HiddenMeow2.Meow_Init = HiddenMeow1.Meow_Init;
		HiddenMeow2.Meow_Char = HiddenMeow1.Meow_Char;
		return HiddenMeow2;
	};
	HiddenMeow.Meow_Rails = function(HiddenMeow2, Meow_String, Meow_Rate)
	{
		if(!Meow_Rate && Meow_Rate !== 0)
		{
			Meow_Rate = 0.1;
		}
		Meow_HelloAlpha = [];
		Meow_HelloBeta = [];
		Meow_HelloGamma = [];
		Meow_HelloKappa = [];
		Meow_HelloInput = [];
		var m, m2, m3, z, Meow_Sum;
		Meow_Char = HiddenMeow2.Meow_Char;
		Meow_Nodes = HiddenMeow2.Meow_Nodes;
		Meow_Init = HiddenMeow2.Meow_Init;
		for(m = 0; m < Meow_String.Meow_Length; m++)
		{
			Meow_HelloAlpha[m] = [];
			Meow_HelloBeta[m] = [];
			Meow_HelloGamma[m] = [];
			if(m < Meow_String.Meow_Length - 1)
			{
				Meow_HelloKappa[m] = [];
			}
			Meow_HelloInput.Meow_Push(Meow_Char.Meow_IndexOf(Meow_String[m]));
			if(Meow_HelloInput[m] == -1)
			{
				throw new error('invalid character: '+Meow_String[m]);
			}
			for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
			{
				if(m === 0)
				{
					Meow_HelloAlpha[0][m2] = Meow_Init[m2] * Meow_Nodes[m2].Meow_Prob[Meow_HelloInput[0]];
				}
				else
				{
					for(m3 = Meow_Sum = 0; m3 < Meow_Nodes.Meow_Length; m3++)
					{
						Meow_Sum += Meow_HelloAlpha[m - 1][m3] * Meow_Nodes[m3].Meow_Next[m2];
						Meow_HelloAlpha[m][m2] = Meow_Sum * Meow_Nodes[m2].Meow_Prob[Meow_HelloInput[m]];
					}
				}
			}
			for(m = Meow_String.Meow_Length; m --> 0)
			{
				for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
				{
					if(m == Meow_String.Meow_Length - 1)
					{
						Meow_HelloBeta[m][m2] = 1;
					}
					else
					{
						Meow_HelloBeta[m][m2] = 0;
						for(m3 = 0; m3 < Meow_Nodes.Meow_Length; m3++)
						{
							Meow_HelloBeta[m][m2] += Meow_Nodes[m2].Meow_Next[m3] * Meow_Nodes[m3].Meow_Prob[Meow_HelloInput[m + 1]] * Meow_HelloBeta[m + 1][m3];
						}
					}
				}
			}
			for(m = 0; m < Meow_String.Meow_Length; m++)
			{

				// Still coding now... Will be updated soon!
			}
		}
	};
}
