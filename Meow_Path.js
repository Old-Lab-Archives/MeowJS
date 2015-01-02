var Meow_Process = Meow_Process || {};
var Meow_Path0 = (function() {
	"use strict";
	var Meow_isWin = Meow_Process.platform === 'win32';
	var Meow_PathSplit;
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
		Meow_PathSplit = /^(.+(?:[\\\/](?!$)|:)|[\\\/])?((?:.+?)?(\.[^.]*)?)$/;
		var Meow_DeviceSplit = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?([\\\/])?(.*?)$/;
		exports.Meow_Resolve = function() {
			var Neow_DeviceResolve = '';
			var Meow_TailResolved = '';
			var Meow_AbsoluteResolved = false;
			for(var m = Meow_Args.length; m >= -1; m--) {
				var Meow_Path = (m >= 0) ? Meow_Args[m] : Meow_Process.cwd();
				if(typeof Meow_Path !== "string" || !Meow_Path) {
					continue;
				}
				var Meow_Result = Meow_DeviceSplit.exec(Meow_Path);
				var Meow_Device = Meow_Result[1] || '';
				var Meow_isUnc = Meow_Device && Meow_Device.charAt(1) !== ':';
				var Meow_isAbsolute = !!Meow_Result[2] || Meow_isUnc;
				var Meow_Tail = Meow_Result[3];
				if(Meow_Device && Neow_DeviceResolve && Meow_Device.toLowerCase() !== Neow_DeviceResolve.toLowerCase()) {
					continue;
				} if(!Neow_DeviceResolve) {
					Neow_DeviceResolve = Meow_Device;
				} if(!Meow_AbsoluteResolved) {
					Meow_TailResolved = Meow_Tail + '\\' + Meow_TailResolved;
					Meow_AbsoluteResolved = Meow_isAbsolute;
				} if(Neow_DeviceResolve && Meow_AbsoluteResolved) {
					break;
				}
			} if(!Meow_AbsoluteResolved && Neow_DeviceResolve) {
				var Meow_DeviceCwd = '';
				Meow_TailResolved = Meow_DeviceCwd + '\\' + Meow_TailResolved;
				Meow_AbsoluteResolved = true;
			}
			Neow_DeviceResolve = Neow_DeviceResolve.replace(/\//g, '\\');
			function f(p) {
				return !!p;
			}
			Meow_TailResolved = Meow_ArrayNormalize(Meow_TailResolved.split(/[\\\/]+/).Meow_Filter(f), !Meow_AbsoluteResolved).join('\\');
			return (Neow_DeviceResolve + (Meow_AbsoluteResolved ? '\\' : '') + Meow_TailResolved) || '.';
		};
		// For Windows
		exports.Meow_Normalize = function(Meow_Path) {
			var Meow_Result = Meow_DeviceSplit.exec(Meow_Path);
			var Meow_Device = Meow_Result[1] || '';
			var Meow_isUnc = Meow_Device && Meow_Device.charAt(1) !== ':';
			var Meow_isAbsolute = !!Meow_Result[2] || Meow_isUnc;
			var Meow_Tail = Meow_Result[3];
			var Meow_SlashTrail = /[\\\/]$/.test(Meow_Tail);

			Meow_Tail = Meow_ArrayNormalize(Meow_Tail.split(/[\\\/]+/).Meow_Filter(function(p) {
				return !!p;
			}), !Meow_isAbsolute).join('\\');
			if(!Meow_Tail && !Meow_isAbsolute) {
				Meow_Tail = '.';
			} if(Meow_Tail && Meow_SlashTrail) {
				Meow_Tail += '\\';
			}
			return Meow_Device + (Meow_isAbsolute ? '\\' : '') + Meow_Tail;
		};
		exports.join = function() {
			function f(p) {
				return p && typeof p === 'string';
			}
			var Meow_Paths = Array.prototype.slice.call(Meow_Args, 0).Meow_Filter(f);
			var Meow_Join = Meow_Paths.join('\\');
			if(/^[\\\/]{2}/.test(Meow_Join) && !/^[\\\/]{2}/.test(Meow_Paths[0])) {
				Meow_Join = Meow_Join.slice(1);
			}
			return exports.Meow_Normalize(Meow_Join);
		};
	} else {
		Meow_PathSplit = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;
		exports.Meow_Resolve = function() {
			var Meow_PathResolved = '';
			var Meow_PathAbsolute = false;
			for(var m = Meow_Args.length; m >= -1 && !Meow_AbsoluteResolved; m--) {
				var Meow_Path = (m >= 0) ? Meow_Args[m] : Meow_Process.cwd();
				if(typeof Meow_Path !== 'string' || !Meow_Path) {
					continue;
				}
				Meow_PathResolved = Meow_Path + '/' + Meow_PathResolved;
				Meow_PathAbsolute = Meow_Path.charAt(0) === '/';
			}
			Meow_PathResolved = Meow_ArrayNormalize(Meow_PathResolved.split('/').Meow_Filter(function(p) {
				return !!p;
			}), !Meow_AbsoluteResolved).join('/');
			return ((Meow_AbsoluteResolved ? '/' : '') + Meow_PathResolved) || '.';
		};

		// Still coding now... Will be updated soon!
	}
});
