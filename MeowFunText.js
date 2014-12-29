var MeowFunText = (function() {
	'use strict';
	MeowFunText.Meow_Power = function() {
	var Meow_Date;
	Meow_Power = this;
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
			console.log("invalid config!");
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
		if(Meow_Power.Meow_Canvas === null) {
			if(!Meow_Power.Meow_FetchCanvas()) {
				console.log("Incorrect canvas ID!");
				return false;
			}
		}
		if(Meow_Power.Meow_BufferCanvas === null) {
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
		if(typeof (Meow_TextInfo) !== "object") {
			console.log("invalid text format");
			return false;
		}
		if(!Meow_Power.Meow_isNumber(Meow_TextInfo.x) || !Meow_Power.Meow_isNumber(Meow_TextInfo.y)) {
			console.log("Specify a correct \"x\" & \"y\" axis value.");
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
		var Meow_Text = Meow_TextInfo.text;
		var xxx = Meow_TextInfo.x;
		var y = Meow_TextInfo.y;
		var Meow_TextSplit, Meow_Aux;
		var Meow_TextLines = [];
		var Meow_BoxWidth = Meow_TextInfo.Meow_BoxWidth;
		var Meow_ProFont = [];
		var Meow_Property, Meow_Props, Meow_PropName, Meow_PropVal, Meow_Attribute;
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
					switch(Meow_PropName) {
						case "Meow_Font":
						Meow_ProFont = Meow_PropVal;
						break;
						case "fontFamily":
						Meow_ProFont.weight = Meow_PropVal;
						break;
						case "fontSize":
						Meow_ProFont.size = Meow_PropVal;
						break;
						case "fontStyle":
						Meow_ProFont.style = Meow_PropVal;
						break;
						case "textShadow":
						Meow_ProShadow = Meow_Power.Meow_Trim(Meow_PropVal);
						Meow_ProShadow = Meow_ProShadow.split(" ");
						if(Meow_ProShadow.length !== 4) {
							Meow_ProShadow = null;
						}
						break;
						case "Meow_Color":
						if(Meow_Power.Meow_isHex(Meow_PropVal)) {
							Meow_ProColor = Meow_PropVal;
						}
						break;
					}
				}
				Meow_ProText = Meow_InnerMatch[2];
			} else if(/<\s*class=/m.test(Meow_Match[m])) {
				Meow_InnerMatch = Meow_Match[m].match(/<\s*class=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/class\s*\>/);
				Meow_ClassDefn = Meow_Power.Meow_FetchClass(Meow_InnerMatch[1]);
				for(Meow_Attribute in Meow_ClassDefn) {
					switch(Meow_Attribute) {
						case "Meow_Font":
						Meow_ProFont = Meow_ClassDefn[Meow_Attribute];
						break;
						case "fontFamily":
						Meow_ProFont.family = Meow_ClassDefn[Meow_Attribute];
						break;
						case "fontWeight":
						Meow_ProFont.weight = Meow_ClassDefn[Meow_Attribute];
						break;
						case "fontSize":
						Meow_ProFont.size = Meow_ClassDefn[Meow_Attribute];
						break;
						case "fontStyle":
						Meow_ProFont.style = Meow_ClassDefn[Meow_Attribute];
						break;
						case "fontColor":
						if(Meow_Power.Meow_isHex(Meow_ClassDefn[Meow_Attribute])) {
							Meow_ProColor = Meow_ClassDefn[Meow_Attribute];
						}
						break;
						case "textShadow":
						Meow_ProShadow = Meow_Power.Meow_Trim(Meow_ClassDefn[Meow_Attribute]);
						Meow_ProShadow = Meow_ProShadow.split(" ");
						if(Meow_ProShadow.length !== 4) {
							Meow_ProShadow = null;
						}
						break;
					}
				}
				Meow_ProText = Meow_InnerMatch[2];
			} else if(/<\s*br\s*\/>/m.test(Meow_Match[m])) {
				y += parseInt(Meow_Power.lineHeight, 10) * 1.5;
				xxx = Meow_TextInfo.x;
				continue;
			} else {
				Meow_ProText = Meow_Match[m];
			}
			Meow_Power.Meow_BufferContext.textBaseline = Meow_Power.textBaseline;
			Meow_Power.Meow_BufferContext.textAlign = Meow_Power.textAlign;
			if(Meow_ProFont instanceof Array) {
				Meow_Power.Meow_BufferContext.Meow_Font = Meow_ProFont.style + " " + Meow_ProFont.weight + " " + Meow_ProFont.size + " " + Meow_ProFont.family;
			} else {
				Meow_Power.Meow_BufferContext.Meow_Font = Meow_ProFont;
			}
			Meow_Power.Meow_BufferContext.Meow_Font = Meow_ProFont;
			Meow_Power.Meow_BufferContext.Meow_FillStyle = Meow_ProColor;
			if(Meow_ProShadow !== null) {
				Meow_Power.Meow_BufferContext.Meow_ShadowOffsetX = Meow_ProShadow[0].replace("px", "");
				Meow_Power.Meow_BufferContext.Meow_ShadowOffsetY = Meow_ProShadow[1].replace("px", "");
				Meow_Power.Meow_BufferContext.Meow_ShadowBlur = Meow_ProShadow[2].replace("px", "");
				Meow_Power.Meow_BufferContext.Meow_ShadowColor = Meow_ProShadow[3].replace("px", "");
			}
			Meow_TextLines = [];
			Meow_ProText = Meow_ProText.replace(/\s*\n\s*/g, " ");
			if(Meow_BoxWidth !== undefined)
			{
				if(Meow_Power.Meow_ChkLnBrk(Meow_ProText, (Meow_BoxWidth + Meow_TextInfo.x), xxx)) {
					Meow_TextSplit = Meow_Power.Meow_Trim(Meow_ProText).split(" ");
					if(Meow_TextSplit.length === 1) {
						Meow_TextLines.push({Meow_Text: Meow_Power.Meow_Trim(Meow_ProText) + " ", Meow_LineBreak: true});
					} else {
						Meow_Aux = xxx;
						var Meow_Line = 0;
						Meow_TextLines[Meow_Line] = {Meow_Text: undefined, Meow_LineBreak: false};
						for(m3 = 0; m3 < Meow_TextSplit.length; m3++) {
							Meow_TextSplit[m3] += " ";
							if(!Meow_Power.Meow_ChkLnBrk(Meow_TextSplit[m3], (Meow_BoxWidth+Meow_TextInfo.x), Meow_Aux)) {
								if(Meow_TextLines[Meow_Line].text === undefined) {
									Meow_TextLines[Meow_Line].text = Meow_TextSplit[m3];
								} else {
									Meow_TextLines[Meow_Line].text += Meow_TextSplit[m3];
								}
								Meow_Aux += Meow_Power.Meow_BufferContext.Meow_MeasureText(Meow_TextSplit[m3]).width;
							} else {
								Meow_Aux = Meow_TextInfo.x;
								if(Meow_TextLines[Meow_Line].text !== undefined) {
									Meow_Line++;
								}
								Meow_TextLines[Meow_Line] = {Meow_Text: Meow_TextSplit[m3], Meow_LineBreak: true};
								Meow_Aux += Meow_Power.Meow_BufferContext.Meow_MeasureText(Meow_TextSplit[m3]).width;
							}
						}
					}
				}
			}
			if(Meow_TextLines.length === 0) {
				Meow_TextLines.push({Meow_Text: Meow_Power.Meow_Trim(Meow_ProText) + " ", Meow_LineBreak: false});
			}
			for(x = 0; x < Meow_TextLines.length; x++) {
				if(Meow_TextLines[x].Meow_LineBreak) {
					y += parseInt(Meow_Power.lineHeight, 10);
					xxx = Meow_TextInfo.x;
				}
				Meow_Power.Meow_BufferContext.Meow_FillText(Meow_TextLines[x].text, xxx, y);
				xxx += Meow_Power.Meow_BufferContext.Meow_MeasureText(Meow_TextLines[x].text).width;
			}
			Meow_Power.Meow_BufferContext.restore();
		}
	};
	Meow_Power.Meow_DefineClass = function(Meow_id, Meow_defn) {
		if(typeof(Meow_defn) !== "object") {
			console.log("invalid class!");
			return false;
		}
		Meow_Power.Meow_SavedClasses[Meow_id] = Meow_defn;
		return true;
	};
	Meow_Power.Meow_FetchClass = function(Meow_id) {
		if(Meow_Power.Meow_SavedClasses[Meow_id] !== undefined) {
			return Meow_Power.Meow_SavedClasses[Meow_id];
		}
	};
	Meow_Power.Meow_FetchCanvas = function() {
		if(Meow_Power.Meow_CanvasID === null) {
			console.log("Specify the canvas ID! ");
			return false;
		}
		Meow_Power.Meow_Canvas = document.getElementById(Meow_Power.Meow_CanvasID);
		Meow_Power.Meow_Context = Meow_Power.Meow_Canvas.Meow_FetchContext('2D');
		Meow_Power.Meow_FetchBufferCanvas();
		return true;
	};
	Meow_Power.Meow_FetchBufferCanvas = function() {
		Meow_Power.Meow_BufferCanvas = document.createElement('canvas');
		Meow_Power.Meow_BufferCanvas.width = Meow_Power.Meow_Canvas.width;
		Meow_Power.Meow_BufferCanvas.height = Meow_Power.Meow_Canvas.height;
		Meow_Power.Meow_BufferContext = Meow_Power.Meow_BufferCanvas.Meow_FetchContext('2D');
	};
	Meow_Power.Meow_FetchCache = function(Meow_id) {
		if(Meow_Power.Meow_CacheCanvas[Meow_id] === undefined) {
			return false;
		} else {
			return true;
		}
	};
	Meow_Power.Meow_SetCache = function(Meow_id) {
		Meow_Power.Meow_CacheCanvas[Meow_id] = document.createElement("canvas");
		Meow_Power.Meow_CacheCanvas[Meow_id].width = Meow_Power.Meow_BufferCanvas.width;
		Meow_Power.Meow_CacheCanvas[Meow_id].height = Meow_Power.Meow_BufferCanvas.height;
		Meow_Power.Meow_CacheContext[Meow_id] = Meow_Power.Meow_CacheCanvas[Meow_id].Meow_FetchContext('2D');
		Meow_Power.Meow_CacheCanvas[Meow_id].Meow_DrawImage(Meow_Power.Meow_BufferCanvas, 0, 0);
	};
	Meow_Power.Meow_ChkLnBrk = function(Meow_Text, Meow_BoxWidth, xxx) {
		return (Meow_Power.Meow_BufferContext.Meow_MeasureText(Meow_Text).width + xxx > Meow_BoxWidth);
	};
	Meow_Power.Meow_isHex = function(Meow_Hex) {
		return (/^(#[a-fA-F0-9]{3,6})$/m.test(Meow_Hex));
	};
	Meow_Power.Meow_isNumber = function(x) {
		return !isNaN(parseFloat(x)) && isFinite(x);
	};
	Meow_Power.Meow_isEmpty = function(Meow_String) {
		Meow_String = Meow_String.replace(/^\s+|\s+$/, '');
		return Meow_String.length === 0;
	};
	Meow_Power.Meow_Trim = function(Meow_String) {
		var Meow_ws, m;
		Meow_String = Meow_String.replace(/^\s\s*/, '');
		Meow_ws = /\s/;
		m = Meow_String.length;
		while(Meow_ws.test(Meow_String.charAt(--m))) {
			continue;
		}
		return Meow_String.slice(0, m + 1);
	}; };
});
