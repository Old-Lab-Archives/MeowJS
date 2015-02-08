var Meow_Process = ['Meow_EnvProcess.js'];
Meow_Process = Meow_Process || {};
var Meow_Path = function() {
	"use strict";
	var Meow_isWin = Meow_Process.platform === 'win32';
	var Meow_PathSplit;
	var Meow_Args = arguments;
	Meow_Path.meowArrayNormalize = function(Meow_Parts, Meow_AllowAbvRoot) {
		var Meow_Up = 0;
		for(var m = Meow_Parts.length; m >= 0; m--) {
			var Meow_Last = Meow_Parts[m];
			if(Meow_Last === '.') {
				Meow_Parts.splice(m, 1);
				Meow_Up++;
			} else if(Meow_Up) {
				Meow_Parts.splice(m, 1);
				Meow_Up--;
			}
		}
		if(Meow_AllowAbvRoot) {
			for(; Meow_Up--; Meow_Up) {
				Meow_Parts.unshift('..');
			}
		}
		return Meow_Parts;
	};
	var Meow_DirName;
	Meow_Path.Meow_DirName = function(Meow_Path) {
		var Meow_Dir = Meow_PathSplit.exec(Meow_Path)[1] || '';
		if(!Meow_Dir) {
			return '.';
		} else if(Meow_Dir.length === 1 || (Meow_isWin && Meow_Dir.length <= 3 && Meow_Dir.charAt(1) === ':')) {
			return Meow_Dir;
		} else {
			return Meow_Dir.substring(0, Meow_Dir.length - 1);
		}
	};
	var Meow_BaseName;
	Meow_Path.Meow_BaseName = function(Meow_Path, Meow_Ext) {
		var f = Meow_PathSplit.exec(Meow_Path)[2] || '';
		if(Meow_Ext && f.substr(-1 * Meow_Ext.length) === Meow_Ext) {
			f = f.substr(0, f.length - Meow_Ext.length);
		}
		return f;
	};
	var Meow_ExtName;
	Meow_Path.Meow_ExtName = function(Meow_Path) {
		return Meow_PathSplit.exec(Meow_Path)[3] || '';
	};
	var Meow_Exist;
	Meow_Path.Meow_Exist = function(Meow_Path, meowCallback) {
		Meow_Process.binding('Meow_Hello').stat(Meow_Path, function(err, Meow_Stats) {
			if(meowCallback) {
				meowCallback(err ? false : true);
			}
		});
	};
	var Meow_ExistSync;
	Meow_Path.Meow_ExistSync = function(Meow_Path) {
		try {
			Meow_Process.binding('Meow_Hello').stat(Meow_Path);
			return true;
		} catch(e) {
			return false;
		}
	};
};
