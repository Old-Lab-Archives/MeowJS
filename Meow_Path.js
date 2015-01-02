var Meow_Process = Meow_Process || {};
var Meow_Path = (function() {
	"use strict";
	var Meow_isWin = Meow_Process.platform === 'win32';
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

	// Still coding now... Will be updated soon!
});
