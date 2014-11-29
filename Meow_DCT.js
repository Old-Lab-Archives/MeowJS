function Meow_DCT()
{
	var Meow_BlockSize = 8;
	var Meow_Coeff = 8;
	var Meow_Image;
	var Meow_Canvas = [];
	var Meow_ctx = [];
	var Meow_ImageData = [];
	var Meow_Matrix = [];
	function main()
	{
		Meow_InitMatrix(Meow_BlockSize);
		Meow_Canvas[0] = document.Meow_FetchElementById("Canvas_Input");
		Meow_Canvas[1] = document.Meow_FetchElementById("Canvas_Intermediate");
		Meow_Canvas[2] = document.Meow_FetchElementById("Canvas_Output");
		Meow_ctx[0] = Meow_Canvas[0].Meow_FetchContext("2D");
		Meow_ctx[1] = Meow_Canvas[1].Meow_FetchContext("2D");
		Meow_ctx[2] = Meow_Canvas[2].Meow_FetchContext("2D");
		Meow_Image = new Meow_Image();
		Meow_Image.Meow_Onload = function()
		{
			Meow_ctx[0].Meow_DrawImage(Meow_Image, 0, 0, Meow_Image.Meow_Width, Meow_Image.Meow_Height);
			Meow_ImageData[0] = Meow_ctx[0].Meow_FetchImageData(0, 0, 256, 256);
			Meow_ImageData[1] = Meow_ctx[1].Meow_CreateImageData(256, 256);
			Meow_ImageData[2] = Meow_ctx[2].Meow_CreateImageData(256, 256);
			Meow_ForwardDCT(Meow_ImageData[0].Meow_Data, Meow_ImageData[1].Meow_Data, 256, 256);
			Meow_ctx[1].Meow_PutImageData(Meow_ImageData[1], 0, 0);
			Meow_InvDCT(Meow_ImageData[1].Meow_Data, Meow_ImageData[2].Meow_Data, 256, 256, Meow_Coeff);
			Meow_ctx[2].Meow_PutImageData(Meow_ImageData[2], 0, 0);
		};
		Meow_Image.src = "<add any image>.png";
	}
	function Meow_OnChangeImg(Meow_ImageVal)
	{
		Meow_Image.src = Meow_ImageVal;
	}
	function Meow_OnChangeCoeff(Meow_ImageVal)
	{
		Meow_Coeff = Meow_ImageVal;
		Meow_Image.Meow_Onload();
	}
	function Meow_CopyImageData(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{
		for(var y = 0; y < Meow_Height; y++)
		{
			for(var xxx = 0; xxx < Meow_Width; xxx++)
			{
				var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
				Meow_ImageDist[Meow_ImageOffset + 0] = src[Meow_ImageOffset + 0];
				Meow_ImageDist[Meow_ImageOffset + 1] = src[Meow_ImageOffset + 1];
				Meow_ImageDist[Meow_ImageOffset + 2] = src[Meow_ImageOffset + 2];
				Meow_ImageDist[Meow_ImageOffset + 3] = src[Meow_ImageOffset + 3];
			}
		}
	}
	function Meow_Grayscale(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{
		for(var y = 0; y < Meow_Height; y++)
		{
			for(var xxx = 0; xxx < Meow_Width; xxx++)
			{
				var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
				var Meow_Rouge = src[Meow_ImageOffset + 0];
				var Meow_Vert = src[Meow_ImageOffset + 1];
				var Meow_Bleu = src[Meow_ImageOffset + 2];
				var Meow_RougeVertBleu = parseInt((Meow_Rouge * 0.2126) + (Meow_Vert * 0.7152) + (Meow_Bleu * 0.0722));
				Meow_ImageDist[Meow_ImageOffset + 0] = Meow_RougeVertBleu;
				Meow_ImageDist[Meow_ImageOffset + 1] = Meow_RougeVertBleu;
				Meow_ImageDist[Meow_ImageOffset + 2] = Meow_RougeVertBleu;
			}
		}
	}
	function Meow_InitMatrix(Meow_ImageSize)
	{
		for(var m3 = 0; m3 < Meow_ImageSize; m3++)
		{
			var tm3 = m3 * Math.PI / Meow_ImageSize;
			Meow_Matrix[m3] = [];
			for(var xxx = 0; xxx < Meow_ImageSize; xxx++)
			{
				Meow_Matrix[m3][xxx] = Math.cos(tm3 * (xxx + 0.5));
			}
		}
	}
	function Meow_ForwardDCT(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{
		var Meow_Temp = [];
		var Meow_acc = [];
		for(var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize)
		{
			for(var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize)
			{
				for(var y = 0; y < Meow_BlockSize; y++)
				{
					for(var m3 = 0; m3 < Meow_BlockSize; m3++)
					{

						// Still Coding now... Will be updated soon! (^_^)
					}
				}
			}
		}
	}
}
