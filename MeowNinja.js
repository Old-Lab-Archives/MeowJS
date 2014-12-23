var Meow_Ninja = (function(console, Meow_Args, Meow_ReadFileFunc) {
	var MeowNinja, define, Meow_xUtil;
	var Meow_FileName;
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

		// Still coding... will be updated soon! (^_^)
	}
});
