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

	// Still Coding now... Will be updated soon! (^_^)
}
