var Meow_Ninja = (function(console, Meow_Args, Meow_ReadFileFunc) {
	var MeowNinja, define, Meow_xUtil;
	var Meow_FileName, Meow_Env, Meow_Hello, Meow_vMeow, Meow_Path, Meow_Exec, Meow_Context, Meow_Dir, Meow_NodeNinja, Meow_NodeDefine, Meow_Exists, Meow_Main, Meow_LoadOptimizedLib, Meow_NodeExists, ce, cem;
	var Meow_Regex = /\.js$/;
	var Meow_CmdOpt = '';
	var Meow_UseLoadLib = {};
	var Meow_xArgs = Meow_Args;
	var Meow_ConnectArgs = Meow_Args;
	var Meow_ReadFile = typeof Meow_ReadFileFunc !== 'undefined' ? Meow_ReadFileFunc : null;
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

		// Still coding... will be updated soon! (^_^)
	}
});
