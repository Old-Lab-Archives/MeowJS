function MeowImagePlay()
{
	Meow_ColorFormat_Grey = 'G';
	Meow_ColorFormat_Alpha = 'A';
	Meow_ColorFormat_RGB = 'RGB';
	Meow_ColorFormat_RGBA = 'RGBA';
	Meow_ColorPalette = 'P';
	Meow_ColorPaletteBits = 8;
	Meow_Color3bits = [];
	Meow_Color2bits = [];
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

	// Still coding... Will be updated soon!
}
