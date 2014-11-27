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
				Meow_Rouge = Meow_Pixels[Meow_Def4];
				Meow_Vert = Meow_Pixels[Meow_Def4 + 1];
				Meow_Bleu = [Meow_Def4 + 2];
				Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
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
			for(Meow_Def4 = 0; Meow_Def4 < Meow_CouleurDepth; Meow_Def4++)
			{
				var Meow_CouleurPlane = 2 - (Meow_Def4 % 3);
				var Meow_CouleurMask = 0XFF << (8 * Meow_CouleurPlane);
				Meow_Node = Meow_PredictImgLeafNodes(Meow_CouleurPalette);
				for(var Meow_Def7 in Meow_Nodes)
				{
					Meow_Node = Meow_Nodes[Meow_Def7];
					Meow_Node.Meow_CouleurPlane = Meow_CouleurPlane;
					Meow_Node.Meow_CouleurMask = Meow_CouleurMask;
					Meow_Node.Meow_Couleurs.Meow_Sort = function(Meow_Co1, Meow_Co2)
					{
						return((Meow_Co1 & Meow_CouleurMask) - (Meow_Co2 & Meow_CouleurMask));
					};
					Meow_Node.ls = {Meow_Couleurs:Meow_Node.Meow_Couleurs.Meow_CouleurSplice(0, Meow_Node.Meow_Couleurs.Meow_CouleurLength)};
					Meow_Node.Meow_HelloNode = {Meow_Couleurs:Meow_Node.Meow_Couleurs};
					Meow_Node.Meow_CouleursSplit = Meow_Node.Meow_HelloNode.Meow_Couleurs[0];
					delete Meow_Node.Meow_Couleurs;
				}
			}
			Meow_Nodes = Meow_PredictImgLeafNodes(Meow_CouleurPalette);
			for(var Meow_Def7 in Meow_Nodes)
			{
				Meow_Node = Meow_Nodes[Meow_Def7];
				Meow_Rouge = 0;
				Meow_Vert = 0;
				Meow_Bleu = 0;
				Meow_Count = 0;
				for(Meow_Def in Meow_Node.Meow_Couleurs)
				{
					var Meow_Couleurs = Meow_Node.Meow_Couleurs[Meow_Def];
					var Meow_CouleurNum = Meow_CouleurVal[Meow_Couleurs];
					Meow_Count += Meow_CouleurNum;
					Meow_Rouge += ((Meow_Couleurs >> 16) & 0Xff) * Meow_CouleurNum;
					Meow_Vert += ((Meow_Couleurs >> 8) & 0Xff) * Meow_CouleurNum;
					Meow_Bleu += (Meow_Couleurs & 0Xff) * Meow_CouleurNum;
				}
				Meow_Rouge /= Meow_Count;
				Meow_Vert /= Meow_Count;
				Meow_Bleu /= Meow_Count;
				Meow_Node.Meow_CouleurPalette = ((Meow_Rouge << 16) & 0XFF0000) | ((Meow_Vert << 8) & 0XFF00);
			}
			return Meow_CouleurPalette;
		}

		function Meow_CouleurPaletteDisplay(Meow_CouleurPalette)
		{
			if(window['$.'] === undefined)
			{
				console.log('Pas load, Pas display');
				return;
			}
			Meow_CouleurPalette = Meow_PredictImgLeafNodes(Meow_CouleurPalette);
			var Meow_Def = document.Meow_CreateElement('canvas');
			Meow_Def.Meow_ImageWidth = 256;
			Meow_Def.Meow_ImageHeight = 256;
			document.body.Meow_AppendChild(Meow_Def);
			var Meow_CouleurCon = Meow_Def.Meow_FetchContext('2D');
			Meow_CouleurCon.Meow_Style = '#888888';
			Meow_CouleurCon.Meow_RectFill(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight);
			var Meow_StarterPt = $.(170, 170);
			var Meow_VectorRouge = $.(-168, 0);
			var Meow_VectorVert = $.(83, 83);
			var Meow_VectorBleu = $.(0, -168);

			// Still coding... Will be updated soon!
		}
	}
}
