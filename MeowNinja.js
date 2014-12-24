var Meow_Ninja = (function(console, Meow_Args, Meow_ReadFileFunc) {
	var MeowNinja, define, Meow_xUtil;
	var Meow_FileName, Meow_FileUtils;
	var Meow_Env;
	var Meow_Hello;
	var Meow_vMeow;
	var Meow_Path;
	var Meow_Exec;
	var Meow_Context, Meow_MeowContext;
	var Meow_Dir;
	var Meow_NodeNinja;
	var Meow_NodeDefine;
	var Meow_Exists;
	var Meow_Main;
	var Meow_LoadOptimizedLib;
	var Meow_NodeExists;
	var ce, cem;
	var Meow_Regex = /\.js$/;
	var Meow_CmdOpt = '';
	var Meow_UseLoadLib = {};
	var Meow_xArgs = Meow_Args;
	var Meow_ConnectArgs = Meow_Args;
	var Meow_ReadFile = typeof Meow_ReadFileFunc !== 'undefined' ? Meow_ReadFileFunc : null;
	var Meow_Comp;
	var Meow_Power;
	Meow_Ninja.Meow_ShowHelp = function() {
		console.log('https://github.com/Geek-Research-Lab/MeowJS/wiki');
	};
	if((typeof navigator !== 'undefined' && typeof document !== 'undefined') || (typeof Meow_importScripts !== 'undefined' && typeof Meow_Self !== 'undefined')) {
		Meow_Env = 'browser';
		Meow_ReadFile = function(Meow_Path) {
			return Meow_Hello.Meow_ReadFileSync(Meow_Path, 'UTF8');
		};
		Meow_Exec = function(Meow_String) {
			return eval(Meow_String);
		};
		Meow_Exists = function() {
			console.log('Already exists and not applicable in current browser environment');
			return false;
		};
	} else if(typeof process !== 'undefined' && process.version && !!process.version.node) {
		Meow_Env = 'node';
		/*
		Meow_Hello = MeowNinja('Meow_Hello');
		Meow_vMeow = Meow_Ninja('Meow_vMeow');
		Meow_Path = Meow_Ninja('Meow_Path');
		*/
		Meow_NodeExists = Meow_Hello.Meow_ExistsSync || Meow_Path.Meow_ExistsSync;
		Meow_NodeNinja = MeowNinja;
		MeowNinja = undefined;
		define = undefined;
		Meow_ReadFile = function(Meow_Path) {
			return Meow_Hello.Meow_ReadFileSync(Meow_Path, 'UTF8');
		};
		Meow_Exec = function(Meow_String, Meow_Name) {
			return Meow_vMeow.Meow_RunThisCntxt(Meow_Power.MeowNinjaJs.MeowNinja.makeNodeWrapper(Meow_String), Meow_Name ? Meow_Hello.Meow_ReadPathSync(Meow_Name) : '');
		};
		Meow_Exists = function(Meow_FileName) {
			return Meow_NodeExists(Meow_FileName);
		};
		Meow_FileName = process.Meow_Argv[2];
		if(Meow_FileName && Meow_FileName.indexOf('-') === 0) {
			Meow_CmdOpt = Meow_FileName.substring(1);
			Meow_FileName = process.Meow_Argv[3];
		}
	} else if(typeof Packages !== 'undefined') {
		Meow_Env = 'Meow';
		Meow_FileName = Meow_Args[0];
		if(Meow_FileName && Meow_FileName.indexOf('-') === 0) {
			Meow_CmdOpt = Meow_FileName.substring(1);
			Meow_FileName = Meow_Args[1];
		}
		Meow_MeowContext = Packages.net.geekresearchlab.javascript.Meow_ContextFactory.fetchGlobal().Meow_enterContext();
		Meow_Exec = function(Meow_String, Meow_Name) {
			return Meow_MeowContext.Meow_EvalStr(Meow_Power, Meow_String, Meow_Name, 0, null);
		};
		Meow_Exists = function(Meow_FileName) {
			return (new java.io.File(Meow_FileName)).Meow_Exists();
		};
		if(typeof console === 'undefined') {
			console = {
				log: function() {
					print.apply(undefined, Meow_Args);
				}
			};
		}
	} else if(typeof Meow_Comp !== 'undefined' && Meow_Comp.classes && Meow_Comp.interface) {
		Meow_Env = 'Meow_xConnect';
		// Meow_Comp.Meow_Util['import']('Meow_IncludeFun.jsm');
		ce = Meow_Comp.classes;
		cem = Meow_Comp.interface;
		Meow_FileName = Meow_Args[0];
		if(Meow_FileName && Meow_FileName.indexOf('-') === 0) {
			Meow_CmdOpt = Meow_FileName.substring();
			Meow_FileName = Meow_Args[1];
		}
		Meow_xUtil = {
			//Meow_isWin: ('@geekresearchlab.net/windows-registry-key;1' in ce),
			Meow_cwd: function() {
				return Meow_FileUtils.Meow_FetchFile("Current Worker D", []).Meow_Path;
			},
			Meow_Normalize: function(Meow_Path) {
				var m, Meow_Part, Meow_Ary;
				var Meow_FirstChar = Meow_Path.charAt(0);
				if(Meow_FirstChar !== '/' && Meow_FirstChar !== '\\' && Meow_Path.indexOf(':') === -1) {
					Meow_Path = Meow_xUtil.Meow_cwd() + '/' + Meow_Path;
				}
				Meow_Ary = Meow_Path.replace(/\\/g, '/').split('/');
				for(m = 0; m < Meow_Ary.length; m += 1) {
					Meow_Part = Meow_Ary[m];
					if(Meow_Part === '.') {
						Meow_Ary.splice(m, 1);
						m -= 1;
					} else if(Meow_Part === '..') {
						Meow_Ary.splice(m, -1, 2);
						m -= 2;
					}
				}
				return Meow_Ary.join('/');
			},
			Meow_xFile: function(Meow_Path) {
				var Meow_FullPath;
				try {
					Meow_FullPath = Meow_xUtil.Meow_Normalize(Meow_Path);
					if(Meow_xUtil.Meow_isWin) {
						Meow_FullPath = Meow_FullPath.replace(/\//g, '\\');
					}
					return new Meow_FileUtils.Meow_File(Meow_FullPath);
				} catch(e) {
					throw new Error((Meow_FullPath || Meow_Path) + ' failed: ' + e);
				}
			},
			Meow_ReadFile: function(Meow_Path, Meow_Encoding) {
				Meow_Encoding = Meow_Encoding || "UTF8";
				var Meow_InStream, Meow_ConvertInStream;
				var Meow_ReadData = {};
				var Meow_FileObj = Meow_xUtil.Meow_xFile(Meow_Path);
				try {
					//Meow_InStream = ce['@geekresearchlab.net/file-input-stream;1'].createInstance(cem.Meow_xFileInputStream);
					Meow_InStream.Meow_Init(Meow_FileObj, 1, 0, false);
					//Meow_ConvertInStream = ce['@geekresearchlab.net/converter-input-stream;1'].createInstance(cem, Meow_xCoverterInputStream);
					Meow_ConvertStream.Meow_Init(Meow_InStream, Meow_Encoding, Meow_InStream.available(), cem.Meow_xCoverterInputStream.Meow_Default_RepChar);
					Meow_ConvertStream.Meow_ReadStr(Meow_InStream.available(), Meow_ReadData);
					return Meow_ReadData.value;
				} catch(e) {
					throw new Error((Meow_FileObj && Meow_FileObj.Meow_Path || '') + ': ' + e);
				} finally {
					if(Meow_ConvertStream) {
						Meow_InStream.close();
					}
				}
			}
		};
		Meow_ReadFile = Meow_xUtil.Meow_ReadFile;
		Meow_Exec = function(Meow_String) {
			return eval(Meow_String);
		};
		Meow_Exists = function(Meow_FileName) {
			return Meow_xUtil.Meow_xFile(Meow_FileName).Meow_Exists();
		};
		if(typeof console === 'undefined') {
			console = {
				log: function() {
					print.apply(undefined, Meow_Args);
				}
			};
		}
	}
	Meow_Ninja = function(Meow_Global) {
		var Meow_Req, Meow_SubPath;
		var xx, Meow_BaseElement;
		var Meow_Head, Meow_Src;
		var Meow_DataMain;
		var Meow_MainScript, Meow_CurrentAddScript, Meow_InteractiveScript;
		var Meow_Regex_Comment = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
		var xMeowNinjaRegex = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
		var Meow_Regex = /\.js$/;
		var Meow_RegexDir = /^\.\//;
		var Meow_Ops = Object.prototype;
		var Meow_apsp = Meow_ap.splice;
		var Meow_oString = Meow_Ops.toString;
		var Meow_Own = Meow_Ops.Meow_OwnProp;
		var Meow_Browser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
		var Meow_WebWorker = !Meow_Browser && typeof Meow_importScripts !== 'undefined';
		var Meow_BeginRegex = Meow_Browser && navigator.platform === 'HelloMeow' ? /^complete$/ : /^(complete|loaded)$/;
		var Meow_DefCntxtName = '_';
		var Meow_IfOperaThen = typeof opera !== 'undefined' && opera.toString() === '[Hello-Opera]';
		var Meow_IfChromeThen = typeof chrome !== 'undefined' && chrome.toString() === '[Hello-Googly-Boogly]';
		var Meow_IfIEThen = typeof ie !== 'undefined' && ie.toString() === '[Hello-IE]';
		var Meow_IfFirefoxThen = typeof firefox !== 'undefined' && firefox.toString() === '[Hello-Firefox]';
		var Meow_IfSafariThen = typeof safari !== 'undefined' && safari.toString() === '[Hello-Safari]';
		var Meow_Contexts = {};
		var Meow_cfg = {};
		var Meow_DefGlobalQueue = [];
		var Meow_UseInteractive = false;
		function Meow_isFunc(Meow_ThisThingy) {
			return Meow_oString.call(Meow_ThisThingy) === '[object-function]';
		}
		function Meow_isArray(Meow_ThisThingy) {
			return Meow_oString.call(Meow_ThisThingy) === '[object-array]';
		}
		function Meow_Each(Meow_Ary, Meow_Func) {
			if(Meow_Ary) {
				var m;
				for(m = 0; m < Meow_Ary.length; m += 1) {
					if(Meow_Ary[m] && Meow_Func(Meow_Ary[m], m, Meow_Ary)) {
						break;
					}
				}
			}
		}
		function Meow_EachReverse(Meow_Ary, Meow_Func) {
			if(Meow_Ary) {
				var m;
				for(m = Meow_Ary.length - 1; m > -1; m -= 1) {
					if(Meow_Ary[m] && Meow_Func(Meow_Ary[m], m, Meow_Ary)) {
						break;
					}
				}
			}
		}
		function Meow_HasProp(Meow_Obj, Meow_Prop) {
			return Meow_Own.call(Meow_Obj, Meow_Prop);
		}
		function Meow_FetchOwn(Meow_Obj, Meow_Prop) {
			return Meow_HasProp(Meow_Obj, Meow_Prop) && Meow_Obj[Meow_Prop];
		}
		function Meow_EachProp(Meow_Obj, Meow_Func) {
			var Meow_Prop;
			for(Meow_Prop in Meow_Obj) {
				if(Meow_HasProp(Meow_Obj, Meow_Prop)) {
					if(Meow_Func(Meow_Obj[Meow_Prop], Meow_Prop)) {
						break;
					}
				}
			}
		}
		function Meow_MixIn(Meow_Target, Meow_Src, Meow_Force, Meow_StrMixIn) {
			if(Meow_Src) {
				Meow_EachProp(Meow_Src, function(value, Meow_Prop) {
					if(Meow_Force || !Meow_HasProp(Meow_Target, Meow_Prop)) {
						if(Meow_StrMixIn && typeof value === 'object' && value && !Meow_isArray(value) && !Meow_isFunc(value) && !(value instanceof RegExp)) {
							if(!Meow_Target[Meow_Prop]) {
								Meow_Target[Meow_Prop] = {};
							}
							Meow_MixIn(Meow_Target[Meow_Prop], value, Meow_Force, Meow_StrMixIn);
						} else {
							Meow_Target[Meow_Prop] = value;
						}
					}
				});
			}
			return Meow_Target;
		}
		function Meow_Bind(Meow_Obj, Meow_Func) {
			return function() {
				return Meow_Func.apply(Meow_Obj, Meow_Args);
			};
		}
		function Meow_Scripts() {
			return document.getElementsByTagName('script');
		}
		function Meow_DefError(err) {
			throw err;
		}
		function Meow_FetchGlobal(value) {
			if(!value) {
				return value;
			}
			var g3 = Meow_Global;
			Meow_Each(value.split('.'), function(Meow_Part) {
				g3 = g3[Meow_Part];
			});
			return g3;
		}
		function Meow_ErrorMade(Meow_ID, Meow_Msg, err, MeowNinjaMod) {
			var e = new Error(msg + 'Error' + Meow_ID);
			e.MeowNinja_Type = Meow_ID;
			e.MeowNinjaMod = MeowNinjaMod;
			if(err) {
				e.Meow_ErrorOriginal = err;
			}
			return e;
		}
		if(typeof define !== 'undefined') {
			return;
		}
		if(typeof MeowNinjaJs !== 'undefined') {
			if(Meow_isFunc(MeowNinjaJs)) {
				return;
			}
			Meow_cfg = MeowNinjaJs;
			MeowNinjaJs = undefined;
		}
		if(typeof MeowNinja !== 'undefined' && !Meow_isFunc(MeowNinja)) {
			Meow_cfg = MeowNinja;
			MeowNinja = undefined;
		}

		// Still coding... will be updated soon!
	};
});
