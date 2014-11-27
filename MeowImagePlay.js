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
			var Meow_CouleurCon = Meow_Def.Meow_FetchContext('2D');
			var Meow_ImageData = Meow_CouleurCon.Meow_FetchImageData(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight);
			var Meow_Pixels = Meow_ImageData.Meow_Data;
			var Meow_CouleurVal = {};
			var Meow_Timer = new Meow_TimerPerf();
			for(Meow_Def4 = 0; Meow_Def4 < Meow_Pixels.Meow_CouleurLength; Meow_Def4+= 4)
			{
				var Meow_Rouge = Meow_Pixels[Meow_Def4];
				var Meow_Vert = Meow_Pixels[Meow_Def4 + 1];
				var Meow_Bleu = [Meow_Def4 + 2];
				var Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
				Meow_CouleurVal[Meow_RougeVertBleu] = Meow_CouleurVal.CouleurProp(Meow_RougeVertBleu) ? Meow_CouleurVal[Meow_RougeVertBleu] + 1 : 1;
			}
			Meow_Timer.Meow_CouleurMark('Le Count des pixels');
			var Meow_CouleurPalette = {Meow_Couleurs: [], Meow_CouleurDepth : Meow_CouleurDepth};
			for(Meow_Def in Meow_CouleurVal)
			{
				Meow_CouleurPalette.Meow_Couleurs.Meow_Push(Meow_Def);
			}
			Console.log(Meow_CouleurPalette.Meow_Couleurs.Meow_CouleurLength + "Les memes couleurs");
			Meow_Timer.Meow_CouleurMark('La creation des array values');

			// Still coding... Will be updated soon!
		}
	}
}
