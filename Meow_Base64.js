var Meow_Base64 = function() {
	if(typeof module !== 'undefined' && module["exports"]) {
		module["exports"] = Meow_Base64;
	} else if(typeof define !== 'undefined' && define["AMD"]) {
		define(function() {
			return Meow_Base64;
		});
	} else {
		(global["ashumeow"] = global["ashumeow"] || {})["Meow_Base64"] = Meow_Base64;
	}
};
//
// Still more to code...
//
