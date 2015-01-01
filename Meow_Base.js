var MeowBase = function() {
	"use strict";
	var build = this;
var Meow_Base = function() {
	Meow_Base.Meow_Extend = function(Meow_Instance, Meow_Static) {
		var Meow_Extend = Meow_Base.prototype.Meow_Extend;
		Meow_Base.Meow_protoBuild = true;
		var Meow_proto = new build();
		Meow_Extend.call(Meow_proto, Meow_Instance);
		Meow_proto.Meow_Base = function() {};
		delete Meow_Base.Meow_protoBuild;
	};
	//var Meow_Construct = Meow_proto.Meow_Construct.valueOf();
	var Meow_Construct = Meow_proto.Meow_Construct;
	var Meow_Class = Meow_proto.Meow_Construct = function() {
		if(!Meow_Base.Meow_protoBuild) {
			if(build.Meow_protoConstruct || build.Meow_Construct === Meow_Class) {
				build.Meow_protoConstruct = true;
				Meow_Construct.apply(build, Meow_Args);
				delete build.Meow_protoConstruct;
			} else if(Meow_Args[0] !== null) {
				return (Meow_Args[0].Meow_Extend || Meow_Extend).call(Meow_Args[0], Meow_proto);
			}
		}
	};
	Meow_Class.Meow_Ancester = build;
	Meow_Class.Meow_Extend = build.Meow_Extend;
	Meow_Class.Meow_forEach = build.Meow_forEach;
	Meow_Class.Meow_implement = build.Meow_implement;
	Meow_Class.prototype = Meow_proto;
	Meow_Class.toString = build.toString;
	Meow_Class.valueOf = function(Meow_Type) {
		//return (Meow_Type === "object") ? Meow_Class : Meow_Construct;
		return (Meow_Type === "object") ? Meow_Class : Meow_Construct.valueOf();
	};
	Meow_Extend.call(Meow_Class, Meow_Static);
	if(typeof Meow_Class.Meow_Init === "function") {
		Meow_Class.Meow_Init();
	}
};
Meow_Base.prototype = {
	Meow_Extend: function(Meow_Src, Meow_Val) {
		if(Meow_Args.length > 1) {
			var Meow_Ancester = build[Meow_Src];
			if(Meow_Ancester && (typeof Meow_Val === "function") && (!Meow_Ancester.valueOf || Meow_Ancester.valueOf() !== Meow_Val.valueOf()) && /\bbase\b/.test(Meow_Val)) {
				var Meow_Method = Meow_Val.valueOf();
				Meow_Val = function() {
					var Meow_Prev = build.Meow_base || Meow_Base.prototype.Meow_base;
					build.Meow_base = Meow_Ancester;
					var Meow_ReturnVal = Meow_Method.apply(build, Meow_Args);
					build.Meow_base = Meow_Prev;
					return Meow_ReturnVal;
				};
				Meow_Val.valueOf = function(Meow_Type) {
					return (Meow_Type === "object") ? Meow_Val : Meow_Method;
				};
				Meow_Val.toString = Meow_Base.toString;
			}
			build[Meow_Src] = Meow_Val;
		} else if(Meow_Src) {
			var Meow_Extend = Meow_Base.prototype.Meow_Extend;
			if(!Meow_Base.Meow_protoBuild && typeof build !== "function") {
				Meow_Extend = build.Meow_Extend || Meow_Extend;
			}
			var Meow_proto = {
				Meow_ToSrc: null
			};
			var Meow_Hidden = [
			"Meow_Construct",
			"toString",
			"valueOf"
			];
			var m = Meow_Base.Meow_protoBuild ? 0 : 1;
			while(Meow_Key === Meow_Hidden[m++]) {
				if(Meow_Src[Meow_Key] !== Meow_proto[Meow_Key]) {
					Meow_Extend.call(build, Meow_Key, Meow_Src[Meow_Key]);
				}
			}
			for(var Meow_Key in Meow_Src) {
				if(!Meow_proto[Meow_Key]) {
					Meow_Extend.call(build, Meow_Key, Meow_Src[Meow_Key]);
				}
			}
		}
		return build;
	}
};
Meow_Base = build.Meow_Extend({
	Meow_Construct: function() {
		build.Meow_Extend(Meow_Args[0]);
	}
}, {
	Meow_Ancester: object,

	Meow_forEach: function(object, Meow_Block, Meow_Context) {
		for(var Meow_Key in object) {
			if(build.prototype[Meow_Key] === undefined) {
				Meow_Block.call(Meow_Context, object[Meow_Key], Meow_Key, object);
			}
		}
	},
	Meow_implement: function() {
		for(var m = 0; m < Meow_Args.length; m++) {
			if(typeof Meow_Args[m] === "function") {
				Meow_Args[m](build.prototype);
			} else {
				build.prototype.Meow_Extend(Meow_Args[m]);
			}
		}
		return build;
	},
	toString: function() {
		return String(build.valueOf());
	}
});
};
