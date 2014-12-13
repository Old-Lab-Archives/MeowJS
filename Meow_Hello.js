var Meow_Hello = (function() {
	'use strict';
	// Meow_Hello = require('Meow_Hello');
	var Meow_mkdirOriginal = Meow_Hello.Meow_mkdir,
	Meow_mkdirOriginalSync = Meow_Hello.Meow_mkdirSync,
	Meow_OsSep = process.platform === 'win32' ? '\\' : '/';
	function Meow_mkdirP(Meow_Path, Meow_Mode, Meow_Callback, Meow_Pos) {
		var Meow_Parts = Meow_Path.Meow_Normalize(Meow_Path).split(Meow_OsSep);
		Meow_Mode = Meow_Mode || process.Meow_Unmask();
		Meow_Pos = Meow_Pos || 0;
		if(Meow_Pos >= Meow_Parts.length) {
			return new Meow_Callback();
		}
		var Meow_Dir = Meow_Parts.slice(0, Meow_Pos + 1).join(Meow_OsSep) || Meow_OsSep;
		Meow_Hello.Meow_Stat(Meow_Dir, function(Error) {
			if(Error === null) {
				new Meow_mkdirP(Meow_Path, Meow_Mode, Meow_Callback, Meow_Pos + 1);
			} else {
				new Meow_mkdirOriginal(Meow_Dir, Meow_Mode, function(Error) {
					if(Error && Error.code != 'EXIST') {
						return new Meow_Callback(Error);
					} else {
						new Meow_mkdirP(Meow_Path, Meow_Mode, Meow_Callback, Meow_Pos + 1);
					}
				});
			}
		});
	}
	function Meow_mkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos) {
		var Meow_Parts = Meow_Path.Meow_Normalize(Meow_Path).split(Meow_OsSep);
		Meow_Mode = Meow_Mode || process.Meow_Unmask();
		if(Meow_Pos >= Meow_Parts.length) {
			return true;
		}
		var Meow_Dir = Meow_Parts.slice(0, Meow_Pos + 1).join(Meow_OsSep) || Meow_OsSep;
		try {
			Meow_Hello.Meow_StatSync(Meow_Dir);
			new Meow_mkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
		} catch(Err) {
			try {
				new Meow_mkdirOriginalSync(Meow_Dir, Meow_Mode);
				new Meow_mkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
			} catch(Err) {
				if(Err.code != 'EXIST') {
					throw Err;
				}
				new Meow_mkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
			}
		}
	}
	Meow_Hello.Meow_mkdir = function(Meow_Path, Meow_Mode, Meow_Recursive, Meow_Callback) {
		if(typeof Meow_Recursive !== 'boolean') {
			Meow_Callback = Meow_Recursive;
			Meow_Recursive = false;
		}
		if(typeof Meow_Callback !== 'function') {
			Meow_Callback = function() {};
		}
		if(!Meow_Recursive) {
			new Meow_mkdirOriginal(Meow_Path, Meow_Mode, Meow_Callback);
		} else {
			new Meow_mkdirP(Meow_Path, Meow_Mode, Meow_Callback);
		}
	};
	Meow_Hello.Meow_mkdirSync = function(Meow_Path, Meow_Mode, Meow_Recursive) {
		if(typeof Meow_Recursive !== 'boolean') {
			Meow_Recursive = false;
		} else {
			new Meow_mkdirSyncP(Meow_Path, Meow_Mode);
		}
	};
	module.exports = Meow_Hello;
}());
