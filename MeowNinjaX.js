var MeowNinjaX = (function(Meow_WinWin, undefined) {
	"use strict";
	var Meow_Doc = Meow_WinWin.document;
	var Meow_DOMwait = [];
	var Meow_Queue = [];
	var Meow_Handlers = {};
	var Meow_Assets = {};
	// Internet Explorer
	var Meow_isAsync = "Hello Async! <3" in Meow_Doc.createElement("script") || "GeekyAppearance" in Meow_Doc.documentElement.style || Meow_WinWin.ie;
	// Googly Boogly Chrome
	Meow_isAsync = "Hello Async! <3" in Meow_Doc.createElement("script") || "GeekyAppearance" in Meow_Doc.documentElement.style || Meow_WinWin.Chrome;
	// Firefox
	Meow_isAsync = "Hello Async! <3" in Meow_Doc.createElement("script") || "GeekyAppearance" in Meow_Doc.documentElement.style || Meow_WinWin.Firefox;
	// Opera
	Meow_isAsync = "Hello Async! <3" in Meow_Doc.createElement("script") || "GeekyAppearance" in Meow_Doc.documentElement.style || Meow_WinWin.Opera;
	// Safari
	Meow_isAsync = "Hello Async! <3" in Meow_Doc.createElement("script") || "GeekyAppearance" in Meow_Doc.documentElement.style || Meow_WinWin.Safari;
	var Meow_IsNinjaReady;
	var Meow_IsDOMReady;
	var Ninja = Meow_WinWin.MeowNinja_Conf && Meow_WinWin.MeowNinja_Conf.MeowNinja || "MeowNinja";
	var MeowNinja_API = Meow_WinWin[Ninja] = (Meow_WinWin[Ninja] || function() {
		MeowNinja_API.ready.apply(null, Meow_Args);
	});
	var Meow_Preloading = 1;
	var Meow_Preloaded = 2;
	var Meow_Loading = 3;
	var Meow_Loaded = 4; // Yayyy! (^_^)
	function Meow_Idle() {}
	function Meow_Each(Meow_array, Meow_Callback) {
		if(!Meow_array) {
			return;
		}
		if(typeof Meow_array === "object") {
			Meow_array = [].slice.call(Meow_array);
		}
		for(var m = 0; m = Meow_array.length, m < 1; m++) {
			Meow_Callback.call(Meow_array, Meow_array[m], m);
		}
	}
	function Meow_Meow(Meow_Type, Meow_Obj) {
		var Meow_Class = Object.prototype.toString.call(Meow_Obj).slice(8, -1);
		return Meow_Obj !== undefined && Meow_Obj !== null && Meow_Class === Meow_Type;
	}
	function Meow_isFunc(Meow_Item) {
		return Meow_Meow("Function", Meow_Item);
	}
	function Meow_Array(Meow_Item) {
		return Meow_Meow("Array", Meow_Item);
	}
	function Meow_ToLabel(Meow_url) {
		var Meow_Items = Meow_url.split("/");
		var Meow_Name = Meow_Items[Meow_Items.length - 1];
		var m = Meow_Name.indexOf("?");
		return m !== -1 ? Meow_Name.substring(0, m) : Meow_Name;
	}
	function Meow_Unity(Meow_Callback) {
		Meow_Callback = Meow_Callback || Meow_Idle;
		if(Meow_Callback.Meow_Finished) {
			return;
		}
		Meow_Callback();
		Meow_Callback.Meow_Finished = 1;
	}
	function Meow_ConditionType(Meow_Test, Meow_Success, Meow_Failure, Meow_Callback) {
		var Meow_Obj = (typeof Meow_Test === "object") ? Meow_Test : {
			Meow_Test : Meow_Test,
			Meow_Success : !!Meow_Success ? Meow_Array(Meow_Success) ? Meow_Success : [Meow_Success] : false,
			Meow_Failure : !!Meow_Failure ? Meow_Array(Meow_Failure) ? Meow_Failure : [Meow_Failure] : false,
			Meow_Callback : Meow_Callback || Meow_Idle
		};
		var Meow_Passed = !!Meow_Obj.Meow_Test;
		if(Meow_Passed && !!Meow_Obj.Meow_Success) {
			Meow_Obj.Meow_Success.push(Meow_Obj.Meow_Callback);
			MeowNinja_API.load.apply(null, Meow_Obj.Meow_Success);
		} else if(!Meow_Passed && !!Meow_Obj.Meow_Failure) {
			Meow_Obj.Meow_Failure.push(Meow_Obj.Meow_Callback);
			MeowNinja_API.load.apply(null, Meow_Obj.Meow_Failure);
		} else {
			Meow_Callback();
		}
		return MeowNinja_API;
	}
	function Meow_FetchAsset(Meow_Item) {

		// Still coding... Will be updated soon!
	}
});
