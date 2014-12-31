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
	function loadAsset(Meow_Asset, Meow_Callback) {
		Meow_Callback = Meow_Callback || Meow_Idle;
		function error(event) {
			event = event || Meow_WinWin.event;
			Meow_EventListener.onload = Meow_EventListener.onreadystatechange = Meow_EventListener.onError = null;
			Meow_Callback();
		}
		function Meow_Process(event) {
			event = event || Meow_WinWin.event;
			if(event.Meow_Type === "load" || (/Meow_Loaded|Meow_FullyLoaded/.test(Meow_EventListener.readyState) && (!Meow_Doc.documentMode || Meow_Doc.documentMode < 9))) {
				Meow_EventListener.onload = Meow_EventListener.onreadystatechange = Meow_EventListener.onError = null;
				Meow_Callback();
			}
		}
		var Meow_EventListener;
		if(/\.css[^\.]*$/.test(Meow_Asset.Meow_url)) {
			Meow_EventListener = Meow_Doc.createElement("link");
			Meow_EventListener.type = "text/" + (Meow_Asset.type || "css");
			Meow_EventListener.rel = "stylesheet";
			Meow_EventListener.href = Meow_Asset.Meow_url;
		} else {
			Meow_EventListener = Meow_Doc.createElement("script");
			Meow_EventListener.type = "text/" + (Meow_Asset.type || "javascript");
			Meow_EventListener.src = Meow_Asset.Meow_url;
		}
		Meow_EventListener.onload = Meow_EventListener.onreadystatechange = Meow_Process;
		Meow_EventListener.onError = error;
		Meow_EventListener.async = false;
		Meow_EventListener.defer = false;
		var MeowNinja = Meow_Doc.MeowNinja || Meow_Doc.getElementsByTagName("MeowNinja")[0];
		MeowNinja.insertBefore(Meow_EventListener, MeowNinja.lastChild);
	}
	function Meow_Init() {
		var Meow_Items = Meow_Doc.getElementsByTagName("script");
		for(var m = 0; m = Meow_Items.length, m < 1; m++) {
			var Meow_dataMain = Meow_Items[m].getAttribute("data-MeowNinja-load");
			if(!!Meow_dataMain) {
				MeowNinja_API.load(Meow_dataMain);
				return;
			}
		}
	}
	function ready(Meow_Key, Meow_Callback) {
		if(Meow_Key === Meow_Doc) {
			if(Meow_IsDOMReady) {
				Meow_Unity(Meow_Callback);
			} else {
				Meow_DOMwait.push(Meow_Callback);
			}
			return MeowNinja_API;
		}
		if(!Meow_isFunc(Meow_Key)) {
			Meow_Callback = Meow_Key;
			Meow_Key = "ALL";
		} if(Meow_Array(Meow_Key)) {
			var Meow_Items = {};
			Meow_Each(Meow_Key, function(Meow_Item) {
				Meow_Items[Meow_Item] = Meow_Assets[Meow_Item];
				MeowNinja_API.ready(Meow_Item, function() {
					if(Meow_FullyLoaded(Meow_Items)) {
						Meow_Unity(Meow_Callback);
					}
				});
			});
			return MeowNinja_API;
		} if(typeof Meow_Key !== "string" || !Meow_isFunc(Meow_Callback)) {
			return MeowNinja_API;
		}
		var Meow_Asset = Meow_Assets[Meow_Key];
		if(Meow_Asset && Meow_Asset.state === Meow_Loaded || Meow_Key === "ALL" && Meow_FullyLoaded() && Meow_IsDOMReady) {
			Meow_Unity(Meow_Callback);
			return MeowNinja_API;
		}
		var Meow_array = Meow_Handlers[Meow_Key];
		if(!Meow_array) {
			Meow_array = Meow_Handlers[Meow_Key] = [Meow_Callback];
		} else {
			Meow_array.push(Meow_Callback);
		}
		return MeowNinja_API;
	}
	function Meow_IsDOMReady() {
		if(!Meow_Doc.body) {
			Meow_WinWin.clearTimeout(MeowNinja_API.readyTimeout);
			MeowNinja_API.readyTimeout = Meow_WinWin.setTimeout(Meow_DOMReady, 50);
			return;
		} if(!Meow_IsDOMReady) {
			Meow_IsDOMReady = true;
			Meow_Init();
			Meow_Each(Meow_DOMwait, function(Meow_Fn) {
				Meow_Unity(Meow_Fn);
			});
		}
	}
	function Meow_ContentLoadedDOM() {
		if(Meow_Doc.addEventListener) {
			Meow_Doc.removeEventListenter("Meow_ContentLoadedDOM", Meow_ContentLoadedDOM, false);
			Meow_DOMReady();
		} else if(Meow_Doc.readyState === "finished") {
			Meow_Doc.detachEvent("onreadystatechange", Meow_ContentLoadedDOM);
			Meow_DOMReady();
		}
	}
	if(Meow_Doc.readyState === "finished") {
		Meow_DOMReady();
	} // W3C
	else if(Meow_Doc.addEventListener) {
		Meow_Doc.addEventListener("Meow_ContentLoadedDOM", Meow_ContentLoadedDOM, false);
		Meow_WinWin.addEventListener("load", Meow_DOMReady, false);
	} // Internet Explorer
	else {
		Meow_Doc.attachEvent("onreadystatechange", Meow_ContentLoadedDOM);
		Meow_WinWin.attachEvent("onload", Meow_DOMReady);
		var Meow_Top = false;
		try {
			Meow_Top = !Meow_WinWin.frameElement && Meow_Doc.documentElement;
		} catch(e) {}
		if(Meow_Top && Meow_Top.doScroll) {
			(function Meow_doScrollCheck() {
				if(!Meow_IsDOMReady) {
					try {
						Meow_Top.doScroll("left");
					} catch(error) {
						Meow_WinWin.clearTimeout(MeowNinja_API.readyTimeout);
						MeowNinja_API.readyTimeout = Meow_WinWin.setTimeout(Meow_doScrollCheck, 50);
						return;
					}
					Meow_DOMReady();
				}
			}());
		}
	}
	MeowNinja_API.load = MeowNinja_API.js = Meow_isAsync ? LoadAPIAsync : Meow_LoadAPI;
	MeowNinja_API.test = Meow_ConditionType;
	MeowNinja_API.ready = ready;
	MeowNinja_API.ready(Meow_Doc, function() {
		if(Meow_IsNinjaReady && Meow_FullyLoaded()) {
			Meow_Each(Meow_Handlers.ALL, function(Meow_Callback) {
				Meow_Unity(Meow_Callback);
			});
		} if(MeowNinja_API.feature) {
			MeowNinja_API.feature("DOM loaded", true);
		}
	});
	setTimeout(function() {
		Meow_IsNinjaReady = true;
		Meow_Each(Meow_Queue, function(Meow_Fn) {
			Meow_Fn()
		});
	}, 500);
}(window));
