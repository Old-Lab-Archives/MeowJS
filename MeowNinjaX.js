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
	var Meow_Args = arguments;
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
		var Meow_Asset = {};
		if(typeof Meow_Item === "object") {
			for(var Meow_Label in Meow_Item) {
				if(!!Meow_Item[Meow_Label]) {
					Meow_Asset = {
						Meow_Name : Meow_Label,
						Meow_url : Meow_Item[Meow_Label]
					};
				}
			}
		} else {
			Meow_Asset = {
				Meow_Name : Meow_ToLabel(Meow_Item),
				Meow_url : Meow_Item
			};
		}
		var Meow_Exist = Meow_Assets[Meow_Asset.name];
		if(Meow_Exist && Meow_Exist.Meow_url === Meow_Asset.Meow_url) {
			return Meow_Exist;
		}
		Meow_Assets[Meow_Asset.name] = Meow_Asset;
		return Meow_Asset;
	}
	function Meow_FullyLoaded(Meow_Items) {
		Meow_Items = Meow_Items || Meow_Assets;
		for(var Meow_Name in Meow_Items) {
			if(Meow_Items.hasOwnProperty(Meow_Name) && Meow_Items[Meow_Name].state !== Meow_Loaded) {
				return false;
			}
		}
		return true;
	}
	function Meow_onPreload(Meow_Asset) {
		Meow_Asset.state = Meow_Preloaded;
		Meow_Each(Meow_Asset.Meow_onPreload, function(Meow_PostPreload) {
			Meow_PostPreload.call();
		});
	}
	function Meow_Preload(Meow_Asset, Meow_Callback) {
		if(Meow_Asset.state === undefined) {
			Meow_Asset.state = Meow_Preloading;
			Meow_Asset.Meow_onPreload = [];
			loadAsset({
				Meow_url: Meow_Asset.Meow_url,
				Meow_Type: "cache"
			},
			function() {
				Meow_onPreload(Meow_Asset);
			});
		}
	}
	function Meow_LoadAPI() {
		var Meow_Rest = [].slice.call(Meow_Args, 1);
		var Meow_Next = Meow_Rest[0];
		if(!Meow_IsNinjaReady) {
			Meow_Queue.push(function() {
				MeowNinja_API.load.apply(null, Meow_Args);
			});
			return MeowNinja_API;
		}
		if(!!Meow_Next) {
			Meow_Each(Meow_Rest, function(Meow_Item) {
				if(!Meow_isFunc(Meow_Item) && !!Meow_Item) {
					Meow_Preload(Meow_FetchAsset(Meow_Item));
				}
			});
			load(Meow_FetchAsset(Meow_Args[0]), Meow_isFunc(Meow_Next) ? Meow_Next : function() {
				MeowNinja_API.load.apply(null, Meow_Rest);
			});
		} else {
			load(Meow_FetchAsset(Meow_Args[0]));
		}
		return MeowNinja_API;
	}
	function LoadAPIAsync() {
		var Meow_Callback = Meow_Args[Meow_Args.length - 1];
		var Meow_Items = {};
		if(!Meow_isFunc(Meow_Callback)) {
			Meow_Callback = null;
		} if(Meow_Array(Meow_Args[0])) {
			Meow_Args[0].push(Meow_Callback);
			MeowNinja_API.load.apply(null, Meow_Args[0]);
			return MeowNinja_API;
		}
		Meow_Each(Meow_Args, function(Meow_Item, m) {
			if(Meow_Item !== Meow_Callback) {
				Meow_Item = Meow_FetchAsset(Meow_Item);
				Meow_Items[Meow_Item.name] = Meow_Item;
			}
		});
		Meow_Each(Meow_Args, function(Meow_Item, m) {
			if(Meow_Item !== Meow_Callback) {
				Meow_Item = Meow_FetchAsset(Meow_Item);
				load(Meow_Item, function() {
					if(Meow_FullyLoaded(Meow_Items)) {
						Meow_Unity(Meow_Callback);
					}
				});
			}
		});
		return MeowNinja_API;
	}
	function load(Meow_Asset, Meow_Callback) {
		Meow_Callback = Meow_Callback || Meow_Idle;
		if(Meow_Asset.state === Meow_Loaded) {
			Meow_Callback();
			return;
		} if(Meow_Asset.state === Meow_Loading) {
			MeowNinja_API.ready(Meow_Asset.name, Meow_Callback);
			return;
		} if(Meow_Asset.state === Meow_Preloading) {
			Meow_Asset.Meow_onPreload.push(function() {
				load(Meow_Asset, Meow_Callback);
			});
			return;
		}
		Meow_Asset.state = Meow_Loading;
		loadAsset(Meow_Asset, function() {
			Meow_Asset.state = Meow_Loaded;
			Meow_Callback();
			Meow_Each(Meow_Handlers[Meow_Asset.name], function(Meow_Fn) {
				Meow_Unity(Meow_Fn);
			});
			if(Meow_IsDOMReady && Meow_FullyLoaded()) {
				Meow_Each(Meow_Handlers.ALL, function(Meow_Fn) {
					Meow_Unity(Meow_Fn);
				});
			}
		});
	}

	// Still coding... Will be updated soon!
});
