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

	// Still coding now... Will be updated soon!
}
