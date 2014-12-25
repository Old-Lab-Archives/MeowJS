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
						if(Meow_Mod.event.error) {
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

		// Still coding... will be updated soon!
	};
});
