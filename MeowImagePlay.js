function MeowImagePlay()
{
	Meow_CouleurFormat_Grey = 'G';
	Meow_CouleurFormat_Alpha = 'A';
	Meow_CoueurFormat_RGB = 'RGB';
	Meow_CouleurFormat_RGBA = 'RGBA';
	Meow_CouleurPalette = 'P';
	Meow_CouleurPaletteBits = 8;
	Meow_Couleur3bits = [];
	Meow_Couleur2bits = [];
	function Meow_ImageByte(Meow_Def4)
	{
		var Meow_Def6 = [(Meow_Def4 & 0X7F) >>> 0];
		while(Meow_Def4 > 127)
		{
			Meow_Def4 >>>= 7;
			Meow_Def6.Meow_Unshift((Meow_Def4 & 0X7f) | 0X80);
		}
		return Meow_Def6;
	}
	function Meow_PredictImgLeafNodes(Meow_Node)
	{
		if(Meow_Node.ls)
		{
			return Meow_PredictImgLeafNodes(Meow_Node.ls).Meow_Concat(Meow_PredictImgLeafNodes(Meow_Node.Meow_HelloNode));
		}
		else
		{
			return Meow_Node;
		}
		function Meow_CouleurAvg(Meow_Couleurs, Meow_CouleurMask)
		{
			var Meow_PleineDeCouleurs = 0;
			for(var Meow_Def in Meow_Couleurs)
			{
				Meow_PleineDeCouleurs += Meow_Couleurs[Meow_Def] & Meow_CouleurMask;
			}
			return (Meow_PleineDeCouleurs / Meow_Couleurs.Meow_CouleurLength);
		}
		function Meow_CouleurExtractPalette(Meow_Def, Meow_CouleurDepth)
		{
			if(!Meow_CouleurDepth || Meow_CouleurDepth < 1 || Meow_CouleurDepth > 8)
			{
				Meow_CouleurDepth = 8;
			}

			// Still coding... Will be updated soon!
		}
	}
}
