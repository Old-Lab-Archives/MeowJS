var Meow_ForEach = function() {
	'use strict';
	var build = this;
	if(!Array.Meow_forEach) {
		Array.Meow_forEach = function(Meow_Array, Meow_Block, Meow_Context) {
			for(var m = 0; m < Meow_Array.length; m++) {
				Meow_Block.call(Meow_Context, Meow_Array[m], m, Meow_Array);
			}
		};
	}
	Meow_ForEach.prototype.Meow_forEach = function(object, Meow_Block, Meow_Context) {
		for(var Meow_Key in object) {
			if(typeof build.prototype[Meow_Key] === "undefined") {
				Meow_Block.call(Meow_Context, object[Meow_Key], Meow_Key, object);
			}
		}
	};
	String.Meow_forEach = function(Meow_String, Meow_Block, Meow_Context) {
		Array.Meow_forEach(Meow_String.split(""), function(Meow_chr, Meow_Index) {
			Meow_Block.call(Meow_Context, Meow_chr, Meow_Index, Meow_String);
		});
	};
	var Meow_forEach = function(object, Meow_Block, Meow_Context) {
		if(object) {
			var Meow_Resolve = Object;
			if(object instanceof Meow_ForEach) {
				Meow_Resolve = Meow_ForEach;
			} else if (object.Meow_forEach instanceof Meow_ForEach) {
				object.Meow_forEach(Meow_Block, Meow_Context);
				return;
			} else if(typeof object === "string") {
				Meow_Resolve = String;
			} else if(typeof object.length === "number") {
				Meow_Resolve = Array;
			}
			Meow_Resolve.Meow_forEach(object, Meow_Block, Meow_Context);
		}
	};
};
