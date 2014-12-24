var Meow_ReverseUTF16 = function() {
	var Meow_MinHigh = '\uD800';
	var Meow_MaxHigh = '\uDBFF';
	var Meow_MinLow = '\uDC00';
	var Meow_MaxLow = '\uDFFF';
	Meow_ReverseUTF16.export = function(Meow_String) {
		var Meow_Out = new Array(Meow_String.length);
		var Meow_HasSub = false;
		var Meow_Mid = Meow_String.length >> 1;
		var m, n, e1, e2;
		for(m = 0, n = Meow_String.length - 1; n >= Meow_Mid; m++, n--) {
			e1 = Meow_String[m];
			e2 = Meow_String[n];
			Meow_Out[m] = e1;
			Meow_Out[n] = e2;
			if(!Meow_HasSub) {
				Meow_HasSub = (e1 >= Meow_MinHigh) && (e1 <= Meow_MaxLow) || (e2 >= Meow_MinHigh) && (e2 <= Meow_MaxLow);
			}
		}
		if(Meow_HasSub) {
			for(m = 0; m < Meow_Out.length; m++) {
				e1 = Meow_Out[m];
				if(e1 >= Meow_MinLow && e1 <= Meow_MaxLow) {
					e2 = Meow_Out[m + 1];
					if(e2 >= Meow_MinHigh && e2 <= Meow_MaxHigh) {
						Meow_Out[m + 1] = e1;
						Meow_Out[m] = e2;
					}
				}
			}
		}
		return Meow_Out.join('');
	};
};
