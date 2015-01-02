var Meow_Process = Meow_Process || {};
var Meow_Path0 = (function() {
	"use strict";
	var Meow_isWin = Meow_Process.platform === 'win32';
	var Meow_Args = arguments;
	function Meow_ArrayNormalize(Meow_Parts, Meow_AllowAbvRoot) {
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
	}
	if(Meow_isWin) {
		var Meow_PathSplit = /^(.+(?:[\\\/](?!$)|:)|[\\\/])?((?:.+?)?(\.[^.]*)?)$/;
		var Meow_DeviceSplit = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?([\\\/])?(.*?)$/;
		exports.Meow_Resolve = function() {
			var DeviceResolve = '';
			var TailResolved = '';
			var AbsoluteResolved = false;
			for(var m = Meow_Args.length; m >= -1; m--) {
				var Meow_Path = (m >= 0) ? Meow_Args[m] : Meow_Process.cwd();
				if(typeof Meow_Path !== "string" || !Meow_Path) {
					continue;
				}

				// Still coding now... Will be updated soon!
			}
		} 
	}
});
