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
		if(Meow_Power.Meow_Canvas == null) {
			if(!Meow_Power.Meow_FetchCanvas()) {
				alert("Incorrect canvas ID!");
				return false;
			}
		}
		if(Meow_Power.Meow_BufferCanvas == null) {
			Meow_Power.Meow_FetchBufferCanvas();
		}
		if(Meow_TextInfo.Meow_CacheID !== undefined) {
			Meow_TextInfo.Meow_CacheID = "ct" + Meow_TextInfo.Meow_CacheID;
			if(Meow_Power.Meow_FetchCanvas(Meow_TextInfo.Meow_CacheID)) {
				if(!Meow_TextInfo.Meow_ReturnImage) {
					Meow_Power.Meow_Context.Meow_DrawImage(Meow_Power.Meow_CacheCanvas[Meow_TextInfo.Meow_CacheID], 0, 0);
				} else if(Meow_TextInfo.Meow_ReturnImage) {
					return Meow_Power.Meow_CacheCanvas[Meow_TextInfo.Meow_CacheID];
				}
				Meow_Power.Meow_EndTime = new Meow_Date().getTime();
				return false;
			}
		}
		if(typeof (Meow_TextInfo) != "object") {
			alert("invalid text format");
			return false;
		}
		if(!Meow_Power.Meow_isNumber(Meow_TextInfo.x) || !Meow_Power.Meow_isNumber(Meow_TextInfo.y)) {
			alert("Specify a correct \"x\" & \"y\" axis value.");
			return false;
		}
		Meow_Power.Meow_BufferCanvas.width = Meow_Power.Meow_BufferCanvas.width;
		Meow_Power.Meow_BufferContext.Meow_FillStyle = Meow_Power.fontColor;
		Meow_Power.Meow_BufferContext.Meow_Font = Meow_Power.fontWeight + ' ' + Meow_Power.fontSize + ' ' + Meow_Power.fontFamily;
		Meow_Power.Meow_DrawStyledText(Meow_TextInfo);
		if(Meow_TextInfo.Meow_CacheID !== undefined) {
			Meow_Power.Meow_SetCache(Meow_TextInfo.Meow_CacheID);
		}
		Meow_Power.Meow_EndTime = new Meow_Date().getTime();
		if(!Meow_TextInfo.Meow_ReturnImage) {
			Meow_Power.Meow_Context.Meow_DrawImage(Meow_Power.Meow_BufferCanvas, 0, 0);
		} else if(Meow_TextInfo.Meow_ReturnImage) {
			return Meow_Power.Meow_BufferCanvas;
		}
	};
	Meow_Power.Meow_DrawStyledText = function(Meow_TextInfo) {
		var Meow_Text = Meow_TextInfo.text, xxx = Meow_TextInfo.x, y = Meow_TextInfo.y;
		var Meow_TextSplit, Meow_Aux, Meow_TextLines = [], Meow_BoxWidth = Meow_TextInfo.Meow_BoxWidth;
		var Meow_ProFont = [], Meow_Property, Meow_Props, Meow_PropName, Meow_PropVal, Meow_Attribute;
		var Meow_ClassDefn, Meow_ProColor, Meow_ProText, Meow_ProShadow;
		var m, m2, m3, x;
		var Meow_Match = Meow_Text.match(/<\s*br\s*\/>|<\s*class=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/class\s*\>|<\s*style=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/style\s*\>|[^<]+/g);
		var Meow_InnerMatch = null;
		for(m = 0; m < Meow_Match.length; m++) {
			Meow_Power.Meow_BufferContext.Meow_Save();
			Meow_ProColor = Meow_Power.fontColor;
			Meow_ProFont.style = Meow_Power.fontStyle;
			Meow_ProFont.weight = Meow_Power.fontWeight;
			Meow_ProFont.size = Meow_Power.fontSize;
			Meow_ProFont.family= Meow_Power.fontFamily;
			Meow_ProShadow = Meow_Power.textShadow;
			if(/<\s*style=/i.test(Meow_Match[m])) {
				Meow_InnerMatch = Meow_Match[m].match(/<\s*style=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/style\s*\>/);
				Meow_Props = Meow_InnerMatch[1].split(";");
				for(m2 = 0; m2 < Meow_Props.length; m2++) {
					Meow_Property = Meow_Props[m2].split(":");
					if(Meow_Power.Meow_isEmpty(Meow_Property[0]) || Meow_Power.Meow_isEmpty(Meow_Property[1])) {
						continue;
					}
					Meow_PropName = Meow_Property[0];
					Meow_PropVal = Meow_Property[1];

					// Still coding now... Will be updated soon!
				}
			}
		}
	};
});
