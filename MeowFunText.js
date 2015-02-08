var MeowFunText = function() {
	'use strict';
	MeowFunText.Meow_Power = function() {
	var Meow_Power = this;
	Meow_Power.Meow_CanvasID = null;
	Meow_Power.Meow_Canvas = null;
	Meow_Power.Meow_Context = null;
	Meow_Power.Meow_BufferCanvas = null;
	Meow_Power.Meow_BufferContext = null;
	Meow_Power.Meow_CacheCanvas = [];
	Meow_Power.Meow_CacheContext = [];
	Meow_Power.Meow_SavedClasses = [];
	var document;

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
};
