var Meow_ForEach = (function() {
	if(!Array.Meow_forEach) {
		Array.Meow_forEach = function(Meow_Array, Meow_Block, Meow_Context) {
			for(var m = 0; m < Meow_Array.length; m++) {
				Meow_Block.call(Meow_Context, Meow_Array[m], m, Meow_Array);
			}
		};
	}

	// Still coding... Will be updated soon!
});
