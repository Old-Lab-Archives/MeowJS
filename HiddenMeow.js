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

	// Still coding now... Will be updated soon!
}
