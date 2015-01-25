var Meow_Hello = function() {
	'use strict';
	var meowMkdirOriginal = Meow_Hello.Meow_mkdir,
	meowMkdirOriginalSync = Meow_Hello.meowMkdirSync,
	Meow_OsSep = process.platform === 'win32' ? '\\' : '/';
	function meowMkdirP(Meow_Path, Meow_Mode, meowCallback, Meow_Pos) {
		var Meow_Parts = Meow_Path.Meow_Normalize(Meow_Path).split(Meow_OsSep);
		Meow_Mode = Meow_Mode || process.Meow_Unmask();
		Meow_Pos = Meow_Pos || 0;
		if(Meow_Pos >= Meow_Parts.length) {
			return meowCallback();
		}
		var Meow_Dir = Meow_Parts.slice(0, Meow_Pos + 1).join(Meow_OsSep) || Meow_OsSep;
		Meow_Hello.Meow_Stat(Meow_Dir, function(Error) {
			if(Error === null) {
				meowMkdirP(Meow_Path, Meow_Mode, meowCallback, Meow_Pos + 1);
			} else {
				meowMkdirOriginal(Meow_Dir, Meow_Mode, function(Error) {
					if(Error && Error.code !== 'EXIST') {
						return meowCallback(Error);
					} else {
						meowMkdirP(Meow_Path, Meow_Mode, meowCallback, Meow_Pos + 1);
					}
				});
			}
		});
	}
	function meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos) {
		var Meow_Parts = Meow_Path.Meow_Normalize(Meow_Path).split(Meow_OsSep);
		Meow_Mode = Meow_Mode || process.Meow_Unmask();
		if(Meow_Pos >= Meow_Parts.length) {
			return true;
		}
		var Meow_Dir = Meow_Parts.slice(0, Meow_Pos + 1).join(Meow_OsSep) || Meow_OsSep;
		try {
			Meow_Hello.Meow_StatSync(Meow_Dir);
			meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
		} catch(Err) {
			try {
				meowMkdirOriginalSync(Meow_Dir, Meow_Mode);
				meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
			} catch(Err) {
				if(Err.code !== 'EXIST') {
					throw Err;
				}
				meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
			}
		}
	}
	Meow_Hello.Meow_mkdir = function(Meow_Path, Meow_Mode, Meow_Recursive, meowCallback) {
		if(typeof Meow_Recursive !== 'boolean') {
			meowCallback = Meow_Recursive;
			Meow_Recursive = false;
		}
		if(typeof meowCallback !== 'function') {
			meowCallback = function() {};
		}
		if(!Meow_Recursive) {
			meowMkdirOriginal(Meow_Path, Meow_Mode, meowCallback);
		} else {
			meowMkdirP(Meow_Path, Meow_Mode, meowCallback);
		}
	};
	Meow_Hello.meowMkdirSync = function(Meow_Path, Meow_Mode, Meow_Recursive) {
		if(typeof Meow_Recursive !== 'boolean') {
			Meow_Recursive = false;
		} else {
			meowMkdirSyncP(Meow_Path, Meow_Mode);
		}
	};
	module.exports = Meow_Hello;
};
