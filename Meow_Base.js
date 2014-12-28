var Meow_Base = (function() {
	Meow_Base.Meow_Extend = function(Meow_Instance, Meow_Static) {
		var Meow_Extend = Meow_Base.prototype.Meow_Extend;
		Meow_Base.Meow_protoBuild = true;
		var build = this;
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
	Meow_Class.forEach = build.forEach;
	Meow_Class.implement = build.implement;
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
});
// Still coding... Will be updated soon!
