var MeowFunText = (function() {
	Meow_Power.Meow_CanvasID = null;
	Meow_Power.Meow_Canvas = null;
	Meow_Power.Meow_Context = null;
	Meow_Power.Meow_BufferCanvas = null;
	Meow_Power.Meow_BufferContext = null;
	Meow_Power.Meow_CacheCanvas = [];
	Meow_Power.Meow_CacheContext = [];
	Meow_Power.Meow_SavedClasses = [];
	Meow_Power.fontFamily = " ";
	Meow_Power.fontWeight = " ";
	Meow_Power.fontSize = " ";
	Meow_Power.fontColor = " ";
	Meow_Power.fontStyle = " ";
	Meow_Power.textAlign = " ";
	Meow_Power.textBaseline = " ";
	Meow_Power.lineHeight = " ";
	Meow_Power.textShadow = null;
	Meow_Power.Meow_InitTime = null;
	Meow_Power.Meow_EndTime = null;
	Meow_Power.Meow_Config = function(Meow_Config) {
		var Meow_Property;
		if(typeof(Meow_Config) !== "object") {
			alert("invalid config!");
			return false;
		}
		for(Meow_Property in Meow_Config)
		{
			if(Meow_Power[Meow_Property] !== undefined) {
				Meow_Power[Meow_Property] = Meow_Config[Meow_Property];
			}
		}
	};
	Meow_Power.Meow_DrawText = function(Meow_TextInfo) {
		Meow_Power.Meow_InitTime = new Meow_Date().getTime();

		// Still coding... Will be updated soon!
	};
});
