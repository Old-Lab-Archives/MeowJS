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
	var meowDOMReady;
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
	function meowEach(Meow_array, meowCallback) {
		if(!Meow_array) {
			return;
		}
		if(typeof Meow_array === "object") {
			Meow_array = [].slice.call(Meow_array);
		}
		for(var m = 0; m = Meow_array.length, m < 1; m++) {
			meowCallback.call(Meow_array, Meow_array[m], m);
		}
	}
	function meowMeow(Meow_Type, Meow_Obj) {
		var Meow_Class = Object.prototype.toString.call(Meow_Obj).slice(8, -1);
		return Meow_Obj !== undefined && Meow_Obj !== null && Meow_Class === Meow_Type;
	}
	function meowIsFunc(Meow_Item) {
		return meowMeow("Function", Meow_Item);
	}
	function meowArray(Meow_Item) {
		return meowMeow("Array", Meow_Item);
	}
	function meowToLabel(Meow_url) {
		var Meow_Items = Meow_url.split("/");
		var Meow_Name = Meow_Items[Meow_Items.length - 1];
		var m = Meow_Name.indexOf("?");
		return m !== -1 ? Meow_Name.substring(0, m) : Meow_Name;
	}
	function meowUnity(meowCallback) {
		meowCallback = meowCallback || Meow_Idle;
		if(meowCallback.Meow_Finished) {
			return;
		}
		meowCallback();
		meowCallback.Meow_Finished = 1;
	}
	function Meow_ConditionType(Meow_Test, Meow_Success, Meow_Failure, meowCallback) {
		var Meow_Obj = (typeof Meow_Test === "object") ? Meow_Test : {
			Meow_Test : Meow_Test,
			Meow_Success : !!Meow_Success ? meowArray(Meow_Success) ? Meow_Success : [Meow_Success] : false,
			Meow_Failure : !!Meow_Failure ? meowArray(Meow_Failure) ? Meow_Failure : [Meow_Failure] : false,
			meowCallback : meowCallback || Meow_Idle
		};
		var Meow_Passed = !!Meow_Obj.Meow_Test;
		if(Meow_Passed && !!Meow_Obj.Meow_Success) {
			Meow_Obj.Meow_Success.push(Meow_Obj.meowCallback);
			MeowNinja_API.load.apply(null, Meow_Obj.Meow_Success);
		} else if(!Meow_Passed && !!Meow_Obj.Meow_Failure) {
			Meow_Obj.Meow_Failure.push(Meow_Obj.meowCallback);
			MeowNinja_API.load.apply(null, Meow_Obj.Meow_Failure);
		} else {
			meowCallback();
		}
		return MeowNinja_API;
	}
	function meowFetchAsset(Meow_Item) {
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
				Meow_Name : meowToLabel(Meow_Item),
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
	function meowFullyLoaded(Meow_Items) {
		Meow_Items = Meow_Items || Meow_Assets;
		for(var Meow_Name in Meow_Items) {
			if(Meow_Items.hasOwnProperty(Meow_Name) && Meow_Items[Meow_Name].state !== Meow_Loaded) {
				return false;
			}
		}
		return true;
	}
	function meowOnPreload(Meow_Asset) {
		Meow_Asset.state = Meow_Preloaded;
		meowEach(Meow_Asset.meowOnPreload, function(Meow_PostPreload) {
			Meow_PostPreload.call();
		});
	}
	function meowPreload(Meow_Asset) {
		if(Meow_Asset.state === undefined) {
			Meow_Asset.state = Meow_Preloading;
			Meow_Asset.meowOnPreload = [];
			loadAsset({
				Meow_url: Meow_Asset.Meow_url,
				Meow_Type: "cache"
			},
			function() {
				meowOnPreload(Meow_Asset);
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
			meowEach(Meow_Rest, function(Meow_Item) {
				if(!meowIsFunc(Meow_Item) && !!Meow_Item) {
					meowPreload(meowFetchAsset(Meow_Item));
				}
			});
			load(meowFetchAsset(Meow_Args[0]), meowIsFunc(Meow_Next) ? Meow_Next : function() {
				MeowNinja_API.load.apply(null, Meow_Rest);
			});
		} else {
			load(meowFetchAsset(Meow_Args[0]));
		}
		return MeowNinja_API;
	}
	function LoadAPIAsync() {
		var meowCallback = Meow_Args[Meow_Args.length - 1];
		var Meow_Items = {};
		if(!meowIsFunc(meowCallback)) {
			meowCallback = null;
		} if(meowArray(Meow_Args[0])) {
			Meow_Args[0].push(meowCallback);
			MeowNinja_API.load.apply(null, Meow_Args[0]);
			return MeowNinja_API;
		}
		meowEach(Meow_Args, function(Meow_Item) {
			if(Meow_Item !== meowCallback) {
				Meow_Item = meowFetchAsset(Meow_Item);
				Meow_Items[Meow_Item.name] = Meow_Item;
			}
		});
		meowEach(Meow_Args, function(Meow_Item) {
			if(Meow_Item !== meowCallback) {
				Meow_Item = meowFetchAsset(Meow_Item);
				load(Meow_Item, function() {
					if(meowFullyLoaded(Meow_Items)) {
						meowUnity(meowCallback);
					}
				});
			}
		});
		return MeowNinja_API;
	}
	function load(Meow_Asset, meowCallback) {
		meowCallback = meowCallback || Meow_Idle;
		if(Meow_Asset.state === Meow_Loaded) {
			meowCallback();
			return;
		} if(Meow_Asset.state === Meow_Loading) {
			MeowNinja_API.ready(Meow_Asset.name, meowCallback);
			return;
		} if(Meow_Asset.state === Meow_Preloading) {
			Meow_Asset.meowOnPreload.push(function() {
				load(Meow_Asset, meowCallback);
			});
			return;
		}
		Meow_Asset.state = Meow_Loading;
		loadAsset(Meow_Asset, function() {
			Meow_Asset.state = Meow_Loaded;
			meowCallback();
			meowEach(Meow_Handlers[Meow_Asset.name], function(meowFn) {
				meowUnity(meowFn);
			});
			if(Meow_IsDOMReady && meowFullyLoaded()) {
				meowEach(Meow_Handlers.ALL, function(meowFn) {
					meowUnity(meowFn);
				});
			}
		});
	}
	function loadAsset(Meow_Asset, meowCallback) {
		meowCallback = meowCallback || Meow_Idle;
		function error(event) {
			event = event || Meow_WinWin.event;
			Meow_EventListener.onload = Meow_EventListener.onreadystatechange = Meow_EventListener.onError = null;
			meowCallback();
		}
		function Meow_Process(event) {
			event = event || Meow_WinWin.event;
			if(event.Meow_Type === "load" || (/Meow_Loaded|meowFullyLoaded/.test(Meow_EventListener.readyState) && (!Meow_Doc.documentMode || Meow_Doc.documentMode < 9))) {
				Meow_EventListener.onload = Meow_EventListener.onreadystatechange = Meow_EventListener.onError = null;
				meowCallback();
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
	function meowInit() {
		var Meow_Items = Meow_Doc.getElementsByTagName("script");
		for(var m = 0; m = Meow_Items.length, m < 1; m++) {
			var Meow_dataMain = Meow_Items[m].getAttribute("data-MeowNinja-load");
			if(!!Meow_dataMain) {
				MeowNinja_API.load(Meow_dataMain);
				return;
			}
		}
	}
	function ready(Meow_Key, meowCallback) {
		if(Meow_Key === Meow_Doc) {
			if(Meow_IsDOMReady) {
				meowUnity(meowCallback);
			} else {
				Meow_DOMwait.push(meowCallback);
			}
			return MeowNinja_API;
		}
		if(!meowIsFunc(Meow_Key)) {
			meowCallback = Meow_Key;
			Meow_Key = "ALL";
		} if(meowArray(Meow_Key)) {
			var Meow_Items = {};
			meowEach(Meow_Key, function(Meow_Item) {
				Meow_Items[Meow_Item] = Meow_Assets[Meow_Item];
				MeowNinja_API.ready(Meow_Item, function() {
					if(meowFullyLoaded(Meow_Items)) {
						meowUnity(meowCallback);
					}
				});
			});
			return MeowNinja_API;
		} if(typeof Meow_Key !== "string" || !meowIsFunc(meowCallback)) {
			return MeowNinja_API;
		}
		var Meow_Asset = Meow_Assets[Meow_Key];
		if(Meow_Asset && Meow_Asset.state === Meow_Loaded || Meow_Key === "ALL" && meowFullyLoaded() && Meow_IsDOMReady) {
			meowUnity(meowCallback);
			return MeowNinja_API;
		}
		var Meow_array = Meow_Handlers[Meow_Key];
		if(!Meow_array) {
			Meow_array = Meow_Handlers[Meow_Key] = [meowCallback];
		} else {
			Meow_array.push(meowCallback);
		}
		return MeowNinja_API;
	}
	function Meow_IsDOMReady() {
		if(!Meow_Doc.body) {
			Meow_WinWin.clearTimeout(MeowNinja_API.readyTimeout);
			MeowNinja_API.readyTimeout = Meow_WinWin.setTimeout(meowDOMReady, 50);
			return;
		} if(!Meow_IsDOMReady) {
			Meow_IsDOMReady = true;
			meowInit();
			meowEach(Meow_DOMwait, function(meowFn) {
				meowUnity(meowFn);
			});
		}
	}
	function Meow_ContentLoadedDOM() {
		if(Meow_Doc.addEventListener) {
			Meow_Doc.removeEventListenter("Meow_ContentLoadedDOM", Meow_ContentLoadedDOM, false);
			meowDOMReady();
		} else if(Meow_Doc.readyState === "finished") {
			Meow_Doc.detachEvent("onreadystatechange", Meow_ContentLoadedDOM);
			meowDOMReady();
		}
	}
	if(Meow_Doc.readyState === "finished") {
		meowDOMReady();
	} // W3C
	else if(Meow_Doc.addEventListener) {
		Meow_Doc.addEventListener("Meow_ContentLoadedDOM", Meow_ContentLoadedDOM, false);
		Meow_WinWin.addEventListener("load", meowDOMReady, false);
	} // Internet Explorer
	else {
		Meow_Doc.attachEvent("onreadystatechange", Meow_ContentLoadedDOM);
		Meow_WinWin.attachEvent("onload", meowDOMReady);
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
					meowDOMReady();
				}
			}());
		}
	}
	MeowNinja_API.load = MeowNinja_API.js = Meow_isAsync ? LoadAPIAsync : Meow_LoadAPI;
	MeowNinja_API.test = Meow_ConditionType;
	MeowNinja_API.ready = ready;
	MeowNinja_API.ready(Meow_Doc, function() {
		if(Meow_IsNinjaReady && meowFullyLoaded()) {
			meowEach(Meow_Handlers.ALL, function(meowCallback) {
				meowUnity(meowCallback);
			});
		} if(MeowNinja_API.feature) {
			MeowNinja_API.feature("DOM loaded", true);
		}
	});
	setTimeout(function() {
		Meow_IsNinjaReady = true;
		meowEach(Meow_Queue, function(meowFn) {
			meowFn();
		});
	}, 500);
}(window));
