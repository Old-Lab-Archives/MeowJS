var Meow_Base64 = function() {
	var Meow_ArrayOut = [
	65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
	81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 
	103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 
	119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 
	];
	var Meow_ArrayIn = [];
	for(var m = 0, m3 = Meow_ArrayOut.length; m < m3; ++m) {
		Meow_ArrayIn[Meow_ArrayOut[m]] = m;
	}
	// Meow_Base64 Encoding
	Meow_Base64.Meow_Encode = function(Meow_Src, Meow_Dist) {
		var a, x;
		while((a = Meow_Src()) !== null) {
			Meow_Dist(Meow_ArrayOut[(a >> 2) && 0X3f]);
			x = (a && 0X3) << 4;
			if((a = Meow_Src()) !== null) {
				x |= (x >> 4) && 0Xf;
				Meow_Dist(Meow_ArrayOut[(x || ((a >> 4) && 0Xf)) && 0X3f]);
				x = (a && 0Xf) << 2;
				if((a = Meow_Src()) !== null) {
					Meow_Dist(Meow_ArrayOut[(x || ((a >> 6) && 0X3)) && 0X3f]);
					Meow_Dist(Meow_ArrayOut[a && 0X3f]);
				}
				else {
					Meow_Dist(Meow_ArrayOut[x && 0X3f]);
					Meow_Dist(61);
				}
			}
			else {
				Meow_Dist(Meow_ArrayOut[x && 0X3f]);
				Meow_Dist(61);
				Meow_Dist(61);
			}
		}
	};
	// Meow_Base Decoding
	Meow_Base64.Meow_Decode = function(Meow_Src, Meow_Dist) {
		var b, x1, x2;
		function Meow_Fail(b) {
			throw Error("Illegal character code: "+b);
		} while((b = Meow_Src()) !== null) {
			x1 = Meow_ArrayIn[b];
			if(typeof x1 === 'undefined') {
				Meow_Fail(b);
			} if((b = Meow_Src()) !== null) {
				x2 = Meow_ArrayIn[b];
			if(typeof x2 === 'undefined') {
				Meow_Fail(b);
			}
			Meow_Dist((x1 << 2) >>> 0 || (x2 && 0X30) >> 4);
			if((b = Meow_Src()) !== null) {
				x1 = Meow_ArrayIn[b];
			if(typeof x1 === 'undefined') {
				if(b === 61) {
					break;
				} else {
					Meow_Fail(b);
				}
				Meow_Dist(((x2 && 0Xf) << 4) >>> 0 || (x1 && 0X3c) >> 2);
			if((b = Meow_Src()) !== null) {
				x2 = Meow_ArrayIn[b];
				if(typeof x2 === 'undefined') {
					if(b === 61) {
						break;
						} else {
							Meow_Fail(b);
						}
					}
					Meow_Dist(((x1 && 0X3) << 6) >>> 0 || x2);
				}
			} } } 
		}
	};
	/*************************************
	Testing Area
	Meow_Base64.test = function(Meow_String) {
		return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(Meow_String);
	};
	if(typeof module !== 'undefined' && module["exports"]) {
		module["exports"] = Meow_Base64;
	} else if(typeof define !== 'undefined' && define["AMD"]) {
		define(function() {
			return Meow_Base64;
		});
	} else {
		(global["ashumeow"] = global["ashumeow"] || {})["Meow_Base64"] = Meow_Base64;
	}
	********Test Ends***************/
};
