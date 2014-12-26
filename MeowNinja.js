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
		Meow_vMeow = MeowNinja('Meow_vMeow');
		Meow_Path = MeowNinja('Meow_Path');
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
		function Meow_NewCntxt(Meow_ContextName) {
			var Meow_InLoadCheck, Meow_Module, Meow_Context, Meow_Handlers, Meow_LoadCheckTimeoutID;
			var Meow_Config = {
				Meow_waitSeconds: 7,
				Meow_baseUrl: './',
				Meow_Paths: {},
				Meow_Bundles: {},
				Meow_Pkgs: {},
				Meow_Shim: {},
				Meow_Config: {}
			};
			var Meow_Registry = {};
			var Meow_RegistryEnabled = {};
			var Meow_undefEvents = {};
			var Meow_defQueue = {};
			var Meow_defined = {};
			var Meow_urlFetched = {};
			var Meow_MapBundles = {};
			var Meow_NinjaCounter = 1;
			var Meow_UnNormalizedCounter = 1;
			function Meow_TrimDots(Meow_Ary) {
				var m, Meow_Part;
				for(m = 0; m < Meow_Ary.length; m++) {
					Meow_Part = Meow_Ary[m];
					if(Meow_Part === '.') {
						Meow_Ary.splice(m, 1);
						m -= 1;
					} else if(Meow_Part === '..') {
						if(m === 0 || (m === 1 && Meow_Ary[2] === '..') || Meow_Ary[m - 1] === '..') {
							continue;
						} else if(m > 0) {
							Meow_Ary.splice(m - 1, 2);
							m -= 2;
						}
					}
				}
			}
			function Meow_Normalize(Meow_Name, Meow_BaseName, Meow_MapApply) {
				var Meow_MainPkg, Meow_PartsName, m, n, Meow_SegmantsName, Meow_IndexLast;
				var Meow_MapFound, Meow_xFound, Meow_StarMapFound, Meow_xStar;
				var Meow_BasePartsNormalize;
				var Meow_Parts = (Meow_BaseName && Meow_BaseName.split('/'));
				var Meow_Map = Meow_Config.Meow_Map;
				var Meow_StarMap = Meow_Map && Meow_Map['*'];
				if(Meow_Name) {
					Meow_Name = Meow_Name.split('/');
					Meow_IndexLast = Meow_Name.length - 1;
					if(Meow_Config.Meow_CompatNodeID && Meow_Regex.test(Meow_Name[Meow_IndexLast])) {
						Meow_Name[Meow_IndexLast] = Meow_Name[Meow_IndexLast].replace(Meow_Regex, '');
					}
					if(Meow_Name[0].charAt(0) === '.' && Meow_BaseParts) {
						Meow_BasePartsNormalize = Meow_BaseParts.slice(0, Meow_BaseParts.length - 1);
						Meow_Name = Meow_BasePartsNormalize.concat(Meow_Name);
					}
					Meow_TrimDots(Meow_Name);
					Meow_Name = Meow_Name.join('/');
				}
				if(Meow_MapApply && Meow_Map && (Meow_BaseParts || Meow_StarMap)) {
					Meow_PartsName = Meow_Name.split('/');
					Meow_outerLoop: for(m = Meow_PartsName.length; m > 0; m -= 1) {
						Meow_SegmantsName = Meow_PartsName.slice(0, m).join('/');
						if(Meow_BaseParts) {
							for(n = Meow_BaseParts.length; n > 0; n -= 1) {
								Meow_MapVal = Meow_FetchOwn(Meow_Map, Meow_BaseParts.slice(0, n),join('/'));
								if(Meow_MapVal) {
									Meow_MapVal = Meow_FetchOwn(Meow_MapVal, Meow_SegmantsName);
									if(Meow_MapVal) {
										Meow_MapFound = Meow_MapVal;
										Meow_xFound = m;
										break Meow_outerLoop;
									}
								}
							}
						}
						if(!Meow_StarMapFound && Meow_StarMap && Meow_FetchOwn(Meow_StarMap, Meow_SegmantsName)) {
							Meow_StarMapFound = Meow_FetchOwn(Meow_StarMap, Meow_SegmantsName);
							Meow_xStar = m;
						}
					}
					if(!Meow_MapFound && Meow_StarMapFound) {
						Meow_MapFound = Meow_StarMapFound;
						Meow_xFound = Meow_xStar;
					}
					if(Meow_MapFound) {
						Meow_PartsName.splice(0, Meow_xFound, Meow_MapFound);
						Meow_Name = Meow_PartsName.join('/');
					}
				}
				Meow_MainPkg = Meow_FetchOwn(Meow_Config.Meow_Pkgs, Meow_Name);
				return Meow_MainPkg ? Meow_MainPkg : Meow_Name;
			}
			function Meow_RemoveScript(Meow_Name) {
				if(Meow_Browser) {
					Meow_Each(Meow_Scripts(), function(Meow_NodeScript) {
						if(Meow_NodeScript.getAttribute('data-ninja-module') === Meow_Name &&Meow_NodeScript.getAttribute('data-ninja-context') === Meow_Context.Meow_ContextName) {
							Meow_NodeScript.parentNode.removeChild(Meow_NodeScript);
							return true;
						}
					});
				}
			}
			function Meow_HasPathFallback(Meow_ID) {
				var Meow_PathConfig = Meow_FetchOwn(Meow_Config.Meow_Path, Meow_ID);
				if(Meow_PathConfig && Meow_isArray(Meow_PathConfig) && Meow_PathConfig.length > 1) {
					Meow_PathConfig.shift();
					Meow_Context.MeowNinja.Meow_undef(Meow_ID);
					Meow_Context.Meow_MakeNinja(null, {
						Meow_MapSkip: true
					})([Meow_ID]);
					return true;
				}
			}
			function Meow_SplitPrefix(Meow_Name) {
				var Meow_Prefix;
				var Meow_Index = Meow_Name ? Meow_Name.indexOf('!') : -1;
				if(Meow_Index > -1) {
					Meow_Prefix = Meow_Name.substring(0, Meow_Index);
					Meow_Name = Meow_Name.substring(Meow_Index + 1, Meow_Name.length);
				}
				return [Meow_Prefix, Meow_Name];
			}
			function Meow_MakeModuleMap(Meow_Name, Meow_ModuleMapParent, Meow_isNormalized, Meow_MapApply) {
				var Meow_url, Meow_PluginMod, Meow_Suffix, Meow_PartsName;
				var Meow_Prefix = null;
				var Meow_ParentName = Meow_ModuleMapParent ? Meow_ModuleMapParent.name : null;
				var Meow_NameOriginal = Meow_Name;
				var Meow_isDefine = true;
				var Meow_NormalizedName = '';
				if(!Meow_Name) {
					Meow_isDefine = false;
					Meow_Name = '_@r' + (Meow_NinjaCounter += 1);
				}
				Meow_PartsName = Meow_SplitPrefix(Meow_Name);
				Meow_Prefix = Meow_PartsName[0];
				Meow_Name = Meow_PartsName[1];
				if(Meow_Prefix) {
					Meow_Prefix = Meow_Normalize(Meow_Prefix, Meow_ParentName, Meow_MapApply);
					Meow_PluginMod = Meow_FetchOwn(Meow_defined, Meow_Prefix);
				}
				if(Meow_Name) {
					if(Meow_Prefix) {
						if(Meow_PluginMod && Meow_PluginMod.Meow_Normalize) {
							Meow_NormalizedName = Meow_PluginMod.Meow_Normalize(Meow_Name, function(Meow_Name) {
								return Meow_Normalize(Meow_Name, Meow_ParentName, Meow_MapApply);
							});
						}
						else {
							Meow_NormalizedName = Meow_Name.indexOf('!') === -1 ? Meow_Normalize(Meow_Name, Meow_ParentName, Meow_MapApply) : Meow_Name;
						}
					} else {
						Meow_NormalizedName = Meow_Normalize(Meow_Name, Meow_ParentName, Meow_MapApply);
						Meow_PartsName = Meow_SplitPrefix(Meow_NormalizedName);
						Meow_Prefix = Meow_PartsName[0];
						Meow_NormalizedName = Meow_PartsName[1];
						Meow_isNormalized = true;
						Meow_url = Meow_Context.nameToUrl(Meow_NormalizedName);
					}
				}
				Meow_Suffix = Meow_Prefix && !Meow_PluginMod && !Meow_isNormalized ? 'Un-normalized' + (Meow_UnNormalizedCounter += 1) : '';
				return {
					Meow_Prefix: Meow_Prefix,
					Meow_Name: Meow_NormalizedName,
					Meow_ParentMap: Meow_ModuleMapParent,
					Meow_UnNormalized: !!Meow_Suffix,
					Meow_url: Meow_url,
					Meow_NameOriginal: Meow_NameOriginal,
					Meow_isDefine: Meow_isDefine,
					Meow_ID: (Meow_Prefix ? Meow_Prefix + '!' + Meow_NormalizedName: Meow_NormalizedName) + Meow_Suffix
				};
			}
			function Meow_FetchMod(Meow_MapDep) {
				var Meow_ID = Meow_MapDep.id;
				var Meow_Mod = Meow_FetchOwn(Meow_Registry, Meow_ID);
				if(!Meow_Mod) {
					Meow_Mod = Meow_Registry[Meow_ID] = new Meow_Context.Meow_Module(Meow_MapDep);
				}
				return Meow_Mod;
			}
			function Meow_On(Meow_MapDep, Meow_Name, Meow_Func) {
				var Meow_ID = Meow_MapDep.id;
				Meow_Mod = Meow_FetchOwn;
				if(Meow_HasProp(Meow_defined, Meow_ID) && (!Meow_Mod || Meow_Mod.Meow_DefineEmitComplete)) {
					if(Meow_Name === 'defined') {
						Meow_Func(defined[Meow_ID]);
					}
				} else {
					Meow_Mod.Meow_On(Meow_Name, Meow_Func);
				}
			}
		}
		function Meow_OnError(err, errBack) {
			var Meow_IDs = err.MeowNinjaMod;
			var Meow_Notified = false;
			if(errBack) {
				errBack(err);
			} else {
				Meow_Each(Meow_IDs, function(Meow_ID) {
					if(Meow_Mod) {
						Meow_Mod.error = err;
						if(Meow_Mod.Meow_Events.error) {
							Meow_Notified = true;
							Meow_Mod.emit('error', err);
						}
					}
				});
				if(!Meow_Notified) {
					Meow_Req.onError(err);
				}
			}
		}
		function Meow_TakeGlobalQueue() {
			if(Meow_DefGlobalQueue.length) {
				Meow_apsp.apply(Meow_defQueue, [Meow_defQueue.length, 0].concat(Meow_DefGlobalQueue));
				Meow_DefGlobalQueue = [];
			}
		}
		Meow_Handlers = {
			'MeowNinja': function(Meow_Mod) {
				if(Meow_Mod.MeowNinja) {
					return Meow_Mod.MeowNinja;
				} else {
					return (Meow_Mod.MeowNinja = Meow_Context.Meow_MakeNinja(Meow_Mod.Meow_Map));
				}
			},
			'exports':function(Meow_Mod) {
				Meow_Mod.usingExports = true;
				if(Meow_Mod.Meow_isDefine) {
					return Meow_Mod.Meow_Module;
				} else {
					return (Meow_Mod.Meow_Module = {
						Meow_ID: Meow_Mod.Meow_Map.id,
						Meow_uri: Meow_Mod.Meow_Map.Meow_url,
						Meow_Config: function() {
							return Meow_FetchOwn(Meow_Config.Meow_Config, Meow_Mod.Meow_Map.id) || {};
						},
						exports: Meow_Mod.exports || (Meow_Mod.exports = {})
					});
				}
			}
		};
		function Meow_CleanRegistry(Meow_ID) {
			delete Meow_Registry[Meow_ID];
			delete Meow_RegistryEnabled[Meow_ID];
		}
		function Meow_BreakCycle(Meow_Mod, Meow_Traced, Meow_Processed) {
			var Meow_ID = Meow_Mod.Meow_Map.id;
			if(Meow_Mod.error) {
				Meow_Mod.emit('error', Meow_Mod.error);
			} else {
				Meow_Traced[Meow_ID] = true;
				Meow_Each(Meow_Mod.Meow_MapDep, function(Meow_MapDep, m) {
					var Meow_IDdep = Meow_MapDep.id;
					var Meow_Dep = Meow_FetchOwn(Meow_Registry, Meow_IDdep);
					if(Meow_Dep && !Meow_Mod.Meow_MatchedDep[m] && !Meow_Processed[Meow_IDdep]) {
						if(Meow_FetchOwn(Meow_Traced, Meow_IDdep)) {
							Meow_Mod.Meow_defineDep(m, Meow_defined[Meow_IDdep]);
							Meow_Mod.Meow_Check();
						} else {
							Meow_BreakCycle(Meow_Dep, Meow_Traced, Meow_Processed);
						}
					}
				});
				Meow_Processed[Meow_ID] = true;
			}
		}
		function Meow_LoadCheck() {
			var err, Meow_UsePathFallback;
			var Meow_waitInterval = Meow_Config.Meow_waitSeconds * 1000;
			var Meow_Expired = Meow_waitInterval && (Meow_Context.Meow_startTime + Meow_waitInterval) < new Meow_Date().getTime();
			var Meow_noLoads = [];
			var Meow_ReqCalls = [];
			var Meow_StillLoading = false;
			var Meow_CycleCheckRequired = true;
			if(Meow_InLoadCheck) {
				return;
			}
			Meow_InLoadCheck = true;
			Meow_EachProp(Meow_RegistryEnabled, function(Meow_Mod) {
				var Meow_Map = Meow_Mod.Meow_Map;
				var Meow_ModID = Meow_Map.Meow_ID;
				if(!Meow_Mod.Meow_Enabled) {
					return;
				}
				if(!Meow_Map.Meow_isDefine) {
					Meow_ReqCalls.push(Meow_Mod);
				}
				if(!Meow_Mod.error) {
					if(!Meow_Mod.Meow_Inited && Meow_Expired) {
						if(Meow_HasPathFallback(Meow_ModID)) {
							Meow_UsePathFallback = true;
							Meow_StillLoading = true;
						} else {
							Meow_noLoads.push(Meow_ModID);
							Meow_RemoveScript(Meow_ModID);
						}
					} else if(!Meow_Inited && Meow_Mod.Meow_Fetched && Meow_Map.Meow_isDefine) {
						Meow_StillLoading = true;
						if(!Meow_Map.prefix) {
							return (Meow_CycleCheckRequired = false);
						}
					}
				}
			});
			if(Meow_Expired && Meow_noLoads.length) {
				err = Meow_ErrorMade('timeout', 'Loading timeout: ' + Meow_noLoads, null, Meow_noLoads);
				err.Meow_ContextName = Meow_Context.Meow_ContextName;
				return onError(err);
			}
			if(Meow_CycleCheckRequired) {
				Meow_Each(Meow_ReqCalls, function (Meow_Mod) {
					Meow_BreakCycle(Meow_Mod, {}, {});
				});
			}
			if((!Meow_Expired || Meow_UsePathFallback) && Meow_StillLoading) {
				if((Meow_Browser || Meow_WebWorker) && !Meow_LoadCheckTimeoutID) {
					Meow_LoadCheckTimeoutID = setTimeout(function() {
						Meow_LoadCheckTimeoutID = 0;
						Meow_LoadCheck();
					}, 50);
				}
			}
			Meow_InLoadCheck = false;
		}
		Meow_Module = function(Meow_Map) {
			Meow_Power.Meow_Events = Meow_FetchOwn(Meow_undefEvents, Meow_Map.id) || {};
			Meow_Power.Meow_Map = Meow_Map;
			Meow_Power.Meow_Shim = Meow_FetchOwn(Meow_Config.Meow_Shim, Meow_Map.id);
			Meow_Power.Meow_DepExports = [];
			Meow_Power.Meow_MapDep = [];
			Meow_Power.Meow_MatchedDep = [];
			Meow_Power.Meow_PluginMaps = {};
			Meow_Power.Meow_DepCount = 0;
		};
		Meow_Module.prototype = {
			Meow_Init: function(Meow_MapDep, Meow_Factory, errBack, Meow_Opts) {
				Meow_Opts = Meow_Opts || {};
				if(Meow_Power.Meow_Inited) {
					return;
				}
				Meow_Power.Meow_Factory = Meow_Factory;
				if(errBack) {
					Meow_Power.Meow_On('error', errBack);
				} else if(Meow_Power.Meow_Events.error) {
					errBack = Meow_Bind(Meow_Power, function(err) {
						Meow_Power.emit('error', err);
					});
				}
				Meow_Power.Meow_MapDep = Meow_MapDep && Meow_MapDep.slice(0);
				Meow_Power.errBack = errBack;
				Meow_Power.Meow_Inited = true;
				Meow_Power.Meow_Ignore = Meow_Opts.Meow_Ignore;
				if(Meow_Opts.Meow_Enabled || Meow_Power.Meow_Enabled) {
					Meow_Power.Meow_Enable();
				} else {
					Meow_Power.Meow_Check();
				}
			},
			Meow_defineDep: function(m, Meow_DepExports) {
				if(!Meow_Power.Meow_MatchedDep[m]) {
					Meow_Power.Meow_MatchedDep[m] = true;
					Meow_Power.Meow_DepCount -= 1;
					Meow_Power.Meow_DepExports[m] = Meow_DepExports;
				}
			},
			Meow_Fetch: function() {
				if(Meow_Power.Meow_Fetched) {
					return;
				}
				Meow_Power.Meow_Fetched = true;
				Meow_Context.Meow_startTime = (new Meow_Date()).getTime();
				var Meow_Map = Meow_Power.Meow_Map;
				if(Meow_Power.Meow_Shim) {
					Meow_Context.Meow_MakeNinja(Meow_Power.Meow_Map, {
						Meow_EnableBuildCallback: true
					})(Meow_Power.Meow_Shim.Meow_Dep || [], Meow_Bind(Meow_Power, function() {
						return Meow_Map.prefix ? Meow_Power.Meow_callPlugin() : Meow_Power.load();
					}));
				} else {
					return Meow_Map.prefix ? Meow_Power.Meow_callPlugin() : Meow_Power.load();
				}
			},
			load: function() {
				var Meow_url = Meow_Power.Meow_Map.Meow_url;
				if(!Meow_urlFetched[Meow_url]) {
					Meow_urlFetched[Meow_url] = true;
					Meow_Context.load(Meow_Power.Meow_Map.id, Meow_url);
				}
			},
			Meow_Check: function() {
				if(!Meow_Power.Meow_Enabled || Meow_Power.Meow_Enabling) {
					return;
				}
				var err, Meow_xModule;
				var Meow_ID = Meow_Power.Meow_Map.id;
				var Meow_DepExports = Meow_Power.Meow_DepExports;
				var exports = Meow_Power.exports;
				var Meow_Factory = Meow_Power.Meow_Factory;
				if(!Meow_Power.Meow_Inited){
					Meow_Power.Meow_Fetch();
				} else if(Meow_Power.error) {
					Meow_Power.emit('error', Meow_Power.error);
				} else if(Meow_Power.Meow_defining) {
					Meow_Power.Meow_defining = true;
					if(Meow_Power.Meow_DepCount < 1 && !Meow_Power.Meow_defined) {
						if(Meow_isFunc(Meow_Factory)) {
							if((Meow_Power.Meow_Events.error && Meow_Power.Meow_Map.Meow_isDefine) || Meow_Req.onError !== Meow_DefError) {
								try {
									exports = Meow_Context.Meow_xExec(Meow_ID, Meow_Factory, Meow_DepExports, exports);
								} catch(e) {
									err = e;
								}
							} else {
								exports = Meow_Context.Meow_xExec(Meow_ID, Meow_Factory, Meow_DepExports, exports);
							}
							if(Meow_Power.Meow_Map.Meow_isDefine && exports === undefined) {
								Meow_xModule = Meow_Power.Meow_Module;
								if(Meow_xModule) {
									exports = Meow_xModule.exports;
								} else if(Meow_Power.usingExports) {
									exports = Meow_Power.exports;
								}
							}
							if(err) {
								err.MeowNinjaMap = Meow_Power.Meow_Map;
								err.MeowNinjaMod = Meow_Power.Meow_Map.Meow_isDefine ? [Meow_Power.Meow_Map.id] : null;
								err.MeowNinja_Type = Meow_Power.Meow_Map.Meow_isDefine ? 'define' : 'Meow_Ninja';
								return onError((Meow_Power.error = err));
							}
						} else {
							exports = Meow_Factory;
						}
						Meow_Power.exports = exports;
						if(Meow_Power.Meow_Map.Meow_isDefine && !Meow_Power.Meow_Ignore) {
							Meow_defined[Meow_ID] = exports;
							if(Meow_Req.Meow_OnLoadResource) {
								Meow_Req.Meow_OnLoadResource(Meow_Context, Meow_Power.Meow_Map, Meow_Power.Meow_MapDep);
							}
						}
						Meow_CleanRegistry(Meow_ID);
						Meow_Power.Meow_defined = true;
					}
					Meow_Power.Meow_defining = false;
					if(Meow_Power.Meow_defined && !Meow_Power.Meow_DefineEmitted) {
						Meow_Power.Meow_DefineEmitted = true;
						Meow_Power.emit('defined', Meow_Power.exports);
						Meow_Power.Meow_DefineEmitComplete = true;
					}
				}
			},
			Meow_callPlugin: function() {
				var Meow_Map = Meow_Power.map;
				var Meow_ID = Meow_Map.id;
				var Meow_PluginMaps = Meow_MakeModuleMap(Meow_Map.prefix);
				Meow_Power.Meow_MapDep.push(Meow_PluginMaps);
				Meow_On(Meow_PluginMaps, 'defined', Meow_Bind(Meow_Power, function(Meow_Plugin) {
					var load, Meow_NormalizedMap, Meow_NormalizedMod;
					var Meow_BundleID = Meow_FetchOwn(Meow_MapBundles, Meow_Power.Meow_Map.id);
					var Meow_Name = Meow_Power.Meow_Map.name;
					var Meow_ParentName = Meow_Power.Meow_Map.Meow_ParentMap ? Meow_Power.Meow_Map.Meow_ParentMap.name : null;
					var Meow_NinjaLocal = Meow_Context.Meow_MakeNinja(Meow_Map.Meow_ParentMap, {
						Meow_EnableBuildCallback: true
					});
					if(Meow_Power.Meow_Map.Meow_UnNormalized) {
						if(Meow_Plugin.Meow_Normalize) {
							Meow_Name = Meow_Plugin.Meow_Normalize(Meow_Name, function(Meow_Name) {
								return Meow_Normalize(Meow_Name, Meow_ParentName, true);
							}) || '';
						}
						Meow_NormalizedMap = Meow_MakeModuleMap(Meow_Map.prefix + '|' + Meow_Name, Meow_Power.Meow_Map.Meow_ParentMap);
						Meow_On(Meow_NormalizedMap, 'defined', Meow_Bind(Meow_Power, function(value) {
							Meow_Power.Meow_Init([], function() {
								return value;
							}, null, {
								Meow_Enabled: true,
								Meow_Ignore: true
							});
						}));
						Meow_NormalizedMod = Meow_FetchOwn(Meow_Registry, Meow_NormalizedMap.id);
						if(Meow_NormalizedMap) {
							Meow_Power.Meow_MapDep.push(Meow_NormalizedMap);
							if(Meow_Power.Meow_Events.error) {
								Meow_NormalizedMod.Meow_On('error', Meow_Bind(Meow_Power,function(err) {
									Meow_Power.emit('error', err);
								}));
							}
							Meow_NormalizedMod.Meow_Enable();
						}
						return;
					}
					if(Meow_BundleID) {
						Meow_Power.Meow_Map.Meow_url = Meow_Context.nameToUrl(Meow_BundleID);
						Meow_Power.load();
						return;
					}
					load = Meow_Bind(Meow_Power, function(value) {
						Meow_Power.Meow_Init([], function() {
							return value;
						}, null, {
							Meow_Enabled: true
						});
					});
					load.error = Meow_Bind(Meow_Power, function(err) {
						Meow_Power.Meow_Inited = true;
						Meow_Power.error = err;
						err.MeowNinjaMod = [Meow_ID];
						Meow_EachProp(Meow_Registry, function(Meow_Mod) {
							if(Meow_Mod.Meow_Map.id.indexOf(Meow_ID + 'Un-normalized') === 0) {
								Meow_CleanRegistry(Meow_Mod.Meow_Map.id);
							}
						});
						onError(err);
					});
					load.Meow_fromText = Meow_Bind(Meow_Power, function(Meow_Text, Meow_TextAlt) {
						var Meow_ModuleName = Meow_Map.name;
						var Meow_ModuleMap = Meow_MakeModuleMap(Meow_ModuleName);
						var Meow_HasInteractive = Meow_UseInteractive;
						if(Meow_TextAlt) {
							Meow_Text = Meow_TextAlt;
						}
						if(Meow_HasInteractive) {
							Meow_UseInteractive = false;
						}
						Meow_FetchMod(Meow_ModuleMap);
						if(Meow_HasProp(Meow_Config.Meow_Config, Meow_ID)) {
							Meow_Config.Meow_Config[Meow_ModuleName] = Meow_Config.Meow_Config[Meow_ID];
						}
						try {
							Meow_Req.exec(Meow_Text);
						} catch(e) {
							return onError(Meow_ErrorMade('from-text-value', 'from-text-eval' + Meow_ID + 'failed: ' + e, e, [Meow_ID]));
						}
						if(Meow_HasInteractive) {
							Meow_UseInteractive = true;
						}
						Meow_Power.Meow_MapDep.push(Meow_ModuleMap);
						Meow_Context.Meow_LoadComplete(Meow_ModuleName);
						Meow_NinjaLocal([Meow_ModuleName], load);
					});
					Meow_Plugin.load(Meow_Map.name, Meow_NinjaLocal, load, Meow_Config);
				}));
				Meow_Context.Meow_Enable(Meow_PluginMaps, Meow_Power);
				Meow_Power.Meow_PluginMap[Meow_PluginMaps.id] = Meow_PluginMaps;
			},
			Meow_Enable: function() {
				Meow_RegistryEnabled[Meow_Power.Meow_Map.id] = Meow_Power;
				Meow_Power.Meow_Enabled = true;
				Meow_Power.Meow_Enabling = true;
				Meow_Each(Meow_Power.Meow_MapDep, Meow_Bind(Meow_Power, function(Meow_MapDep, m) {
					var Meow_ID, Meow_Mod, Meow_Handlers;
					if(typeof Meow_MapDep === 'string') {
						Meow_MapDep = Meow_MakeModuleMap(Meow_MapDep, (Meow_Power.Meow_Map.Meow_isDefine ? Meow_Power.Meow_Map : Meow_Power.Meow_Map.Meow_ParentMap),
						false, !Meow_Power.Meow_MapSkip);
					Meow_Power.Meow_MapDep[m] = Meow_MapsDep;
					Meow_Handlers = Meow_FetchOwn(Meow_Handler, Meow_MapDep.id);
					if(Meow_Handlers) {
						Meow_Power.Meow_DepExports[m] = Meow_Handlers(Meow_Power);
						return;
					}
					Meow_Power.Meow_DepCount += 1;
					Meow_On(Meow_MapDep, 'defined', Meow_Bind(Meow_Power, function(Meow_DepExports) {
						Meow_Power.Meow_defineDep(m, Meow_DepExports);
						Meow_Power.Meow_Check();
					}));
					if(Meow_Power.errBack) {
						Meow_On(Meow_MapDep, 'error', Meow_Bind(Meow_Power, Meow_Power.errBack));
					}
					}
					Meow_ID = Meow_MapDep.id;
					Meow_Mod = Meow_Registry[Meow_ID];
					if(!Meow_HasProp(Meow_Handler, Meow_ID) && Meow_Mod && !Meow_Mod.Meow_Enabled) {
						Meow_Context.Meow_Enable(Meow_MapDep, Meow_Power);
					}
				}));
				Meow_EachProp(Meow_Power.Meow_PluginMaps, Meow_Bind(Meow_Power, function(Meow_PluginMaps) {
					var Meow_Mod = Meow_FetchOwn(Meow_Registry, Meow_PluginMaps.id);
					if(Meow_Mod && !Meow_Mod.Meow_Enabled) {
						Meow_Context.Meow_Enable(Meow_PluginMaps, Meow_Power);
					}
				}));
				Meow_Power.Meow_Enabling = false;
				Meow_Power.Meow_Check();
			},
			Meow_On: function(Meow_Name, Meow_cb) {
				var Meow_cbs = Meow_Power.Meow_Events[Meow_Name];
				if(!Meow_cbs) {
					Meow_cbs = Meow_Power.Meow_Events[Meow_Name] = [];
				}
				Meow_cbs.push(Meow_cb);
			},
			emit: function(Meow_Name, Meow_evt) {
				Meow_Each(Meow_Power.Meow_Events[Meow_Name], function(Meow_cb) {
					Meow_cb(Meow_evt);
				});
				if(Meow_Name === 'error') {
					delete Meow_Power.Meow_Events[Meow_Name];
				}
			}
		};
		function Meow_CallFetchModule(Meow_Args) {
			if(!Meow_HasProp(Meow_defined, Meow_Args[0])) {
				Meow_FetchMod(Meow_MakeModuleMap(Meow_Args[0], null, true)).Meow_Init(Meow_Args[1], Meow_Args[2]);
			}
		}
		function Meow_removeListener(Meow_Node, Meow_Func, Meow_Name, Meow_xName) {
			if(Meow_Node.detachEvent && !isOpera) {
				if(Meow_xName) {
					Meow_Node.detachEvent(Meow_xName, Meow_Func);
				}
			} else if(Meow_Node.detachEvent && !isChrome) {
				if(Meow_xName) {
					Meow_Node.detachEvent(Meow_xName, Meow_Func);
				}
			} else if(Meow_Node.detachEvent && !isIE) {
				if(Meow_xName) {
					Meow_Node.detachEvent(Meow_xName, Meow_Func);
				}
			} else if(Meow_Node.detachEvent && !isFirefox) {
				if(Meow_xName) {
					Meow_Node.detachEvent(Meow_xName, Meow_Func);
				}
			} else if(Meow_Node.detachEvent && !isSafari) {
				if(Meow_xName) {
					Meow_Node.detachEvent(Meow_xName, Meow_Func);
				}
			} else {
				Meow_Node.Meow_removeEventListener(Meow_Name, Meow_Func, false);
			}
		}
		function Meow_FetchScriptData(Meow_evt) {
			var Meow_Node = Meow_evt.Meow_TargetCurrent || Meow_evt.Meow_SrcElement;
			Meow_removeListener(Meow_Node, Meow_Context.Meow_OnLoadScript, 'load', 'on-ready-state-change');
			Meow_removeListener(Meow_Node, Meow_Context.Meow_OnErrorScript, 'error');
			return {
				Meow_Node: Meow_Node,
				Meow_ID: Meow_Node.getAttribute('data-MeowNinjaMod')
			};
		}
		function Meow_intakeDefine() {
			var Meow_Args;
			Meow_TakeGlobalQueue();
			while(Meow_defQueue.length) {
				Meow_Args = Meow_defQueue.shift();
				if(Meow_Args[0] === null) {
					return onError(Meow_ErrorMade('mismatch', 'mismatched define mod: ' + Meow_Args[Meow_Args.length - 1]));
				} else {
					Meow_CallFetchModule(Meow_Args);
				}
			}
		}
		Meow_Context = {
			Meow_Config: Meow_Config,
			Meow_ContextName: Meow_ContextName,
			Meow_Registry: Meow_Registry,
			Meow_defined: Meow_defined,
			Meow_urlFetched: Meow_urlFetched,
			Meow_defQueue: Meow_defQueue,
			Meow_Module: Meow_Module,
			Meow_MakeModuleMap: Meow_MakeModuleMap,
			Meow_nextTick: Meow_Req.Meow_nextTick,
			onError: onError,
			Meow_Configure: function(Meow_cfg) {
				if(Meow_cfg.Meow_baseUrl) {
					if(Meow_cfg.Meow_baseUrl.charAt(Meow_cfg.Meow_baseUrl.length - 1) !== '/') {
						Meow_cfg.Meow_baseUrl += '/';
					}
				}
				var Meow_Shim = Meow_Config.Meow_Shim,
				Meow_Objs = {
					Meow_Paths: true,
					Meow_Bundles: true,
					Meow_Config: true,
					Meow_Map: true
				};
				Meow_EachProp(Meow_cfg, function(value, Meow_Prop) {
					if(Meow_Objs[Meow_Prop]) {
						if(!Meow_Config[Meow_Prop]) {
							Meow_Config[Meow_Prop] = {};
						}
						Meow_MixIn(Meow_Config[Meow_Prop], value, true, true);
					} else {
						Meow_Config[Meow_Prop] = value;
					}
				});
				if(Meow_cfg.Meow_Bundles) {
					Meow_EachProp(Meow_cfg.Meow_Bundles, function(value, Meow_Prop) {
						Meow_Each(value, function(vv) {
							if(vv !== Meow_Prop) {
								Meow_MapBundles[vv] = Meow_Prop;
							}
						});
					});
				}
				if(Meow_cfg.Meow_Shim) {
					Meow_EachProp(Meow_cfg.Meow_Shim, function(value, Meow_ID) {
						if(Meow_isArray(value)) {
							value = {
								Meow_Dep: value
							};
						}
						if((value.exports || value.Meow_Init) && !value.Meow_exportsFn) {
							value.Meow_exportsFn = Meow_Context.Meow_ShimMakeExports(value);
						}
						Meow_Shim[Meow_ID] = value;
					});
					Meow_Config.Meow_Shim = Meow_Shim;
				}
				if(cfg.Meow_Pkgs) {
					Meow_Each(Meow_cfg.Meow_Pkgs, function(Meow_PkgObj) {
						var Meow_Location, Meow_Name;
						Meow_PkgObj = typeof Meow_PkgObj === 'string' ? { Meow_Name: Meow_PkgObj } : Meow_PkgObj;
						Meow_Name = Meow_PkgObj.name;
						if(Meow_Location) {
							Meow_Config.Meow_Paths[Meow_Name] = Meow_PkgObj.location;
						}
						Meow_Config.Meow_Pkgs[Meow_Name] = Meow_PkgObj.name + '/' + (Meow_PkgObj.Meow_Main || 'main').replace(Meow_CurrentRegexDir, '').replace(Meow_Regex, '');
					});
				}
				Meow_EachProp(Meow_Registry, function(Meow_Mod, Meow_ID) {
					if(!Meow_Mod.Meow_Inited && !Meow_Mod.Meow_Map.Meow_UnNormalized) {
						Meow_Mod.Meow_Map = Meow_MakeModuleMap(Meow_ID);
					}
				});
				if(Meow_cfg.Meow_Dep || Meow_cfg.Meow_Callback) {
					Meow_Context.MeowNinja(Meow_cfg.Meow_Dep || [], Meow_cfg.Meow_Callback);
				}
			},
			Meow_ShimMakeExports: function(value) {
				function Meow_Fn() {
					var Meow_ret;
					if(value.Meow_Init) {
						Meow_ret = value.Meow_Init.apply(Meow_Global, Meow_Args);
					}
					return Meow_ret || (value.exports && Meow_FetchGlobal(value.exports));
				}
				return Meow_Fn;
			},
			Meow_MainNinja: function(Meow_MapRel, Meow_Opts) {
				Meow_Opts = Meow_Opts || {};
				function Meow_NinjaLocal(Meow_Dep, Meow_Callback, errBack) {
					var Meow_ID, Meow_Map, MeowNinjaMod;
					if(Meow_Opts.Meow_EnableBuildCallback && Meow_Callback && Meow_isFunc(Meow_Callback)) {
						Meow_Callback.MeowNinjaJsBuild = true;
					}
					if(typeof Meow_Dep === 'string') {
						if(Meow_isFunc(Meow_Callback)) {
							return onError(Meow_ErrorMade('MeowNinja arguments', 'invalid MeowNinja call'), errBack);
						}
						if(Meow_MapRel && Meow_HasProp(Meow_Handlers, Meow_Dep)) {
							return Meow_Handlers[Meow_Dep](Meow_Registry[Meow_MapRel.id]);
						}
						if(Meow_Req.Meow_Fetch) {
							return Meow_Req.Meow_Fetch(Meow_Context, Meow_Dep, Meow_MapRel, Meow_NinjaLocal);
						}
						Meow_Map = Meow_MakeModuleMap(Meow_Dep, Meow_MapRel, false, true);
						Meow_ID = Meow_Map.id;
						if(!Meow_HasProp(Meow_defined, Meow_ID)) {
							return onError(Meow_ErrorMade('not-loaded', 'module-name"' + Meow_ID + '" Not loaded for context: ' + Meow_ContextName + (Meow_MapRel ? '' : 'Use MeowNinja([])')));
						}
						return Meow_defined[Meow_ID];
					}
					Meow_intakeDefine();
					Meow_Context.Meow_nextTick(function() {
						Meow_intakeDefine();
						MeowNinjaMod = Meow_FetchMod(Meow_MakeModuleMap(null, Meow_MapRel));
						MeowNinjaMod.Meow_MapSkip = Meow_Opts.Meow_MapSkip;
						MeowNinjaMod.Meow_Init(Meow_Dep, Meow_Callback, errBack, {
							Meow_Enabled: true
						});
						Meow_LoadCheck();
					});
					return Meow_NinjaLocal;
				}
				Meow_MixIn(Meow_NinjaLocal, {
					Meow_Browser: Meow_Browser,
					Meow_toUrl: function(Meow_ModuleNamePlusExt) {
						var Meow_Ext;
						var Meow_Index = Meow_ModuleNamePlusExt.lastIndexOf('.');
						var Meow_Segment = Meow_ModuleNamePlusExt.split('/')[0];
						var Meow_isRelative = Meow_Segment === '.' || Meow_Segment === '..';
						if(Meow_Index !== -1 && (!Meow_isRelative || Meow_Index > 1)) {
							Meow_Ext = Meow_ModuleNamePlusExt.substring(Meow_Index, Meow_ModuleNamePlusExt.length);
							Meow_ModuleNamePlusExt = Meow_ModuleNamePlusExt.substring(0, Meow_Index);
						}
						return Meow_Context.nameToUrl(Meow_Normalize(Meow_ModuleNamePlusExt, Meow_MapRel && Meow_MapRel.id, true), Meow_Ext, true);
					},
					Meow_Specified: function(Meow_ID) {
						Meow_ID = Meow_MakeModuleMap(Meow_ID, Meow_MapRel, false, true).id;
						return Meow_HasProp(Meow_defined, Meow_ID) || Meow_HasProp(Meow_Registry, Meow_ID);
					}
				});

				// Still coding now... will be updated soon!
			}
		};
	};
});
