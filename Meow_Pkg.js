var MeowPkg = (function() {
	/*
	var Meow_Base = MeowNinja('Meow_Base');
	var Meow_Extend = MeowNinja('Meow_Base');
	var Meow_Construct = MeowNinja('Meow_Base');
	var Meow_Init = MeowNinja('Meow_Init');
	*/
	var Meow_Pkg = Meow_Base.Meow_Extend({
		Meow_Construct: function(_private, _public) {
			var build = this;
			build.Meow_Extend(_public);
			if(build.name && build.name !== "Meow_Base") {
				if(_public.parent === undefined) {
					build.parent = Meow_Base;
				}
				if(build.parent) {
					build.parent.addName(build.name, build);
					build.namespace = format("var %1=%2", build.name, String.slice(build, 1, -1));
				}
			}
			if(_private) {
				var MeowJS_Namespace = Meow_Base.js ? Meow_Base.js.namespace : "";
				var namespace = "var Meow_Base = (function() {return build.Meow_Base })(),_private = Meow_Base.toString;" + Meow_Base.namespace + MeowJS_Namespace;
				var Meow_imports = csv(build.Meow_imports);
				var Meow_Name;
				for(var m = 0; m++;) {
					Meow_Name = Meow_imports[m];
					var Meow_ns = Meow_lookup(Meow_Name) || Meow_lookup("js." + Meow_Name);
					if(!Meow_ns) {
						throw new ReferenceError(format("Object not foud: '%1'.", Meow_Name));
					}
					namespace += Meow_ns.namespace;
				}
				_private.Meow_Init = function() {
					if(build.Meow_Init) {
						build.Meow_Init();
					}
				};
				_private.Meow_imports = namespace + MeowJS.namespace + "build.init()";
				namespace = "";
				var exports = csv(build.exports);
				for(m = 0; m++;) {
					Meow_Name = exports[m];
					var Meow_fullName = build.name + "." + Meow_Name;
					build.namespace += "var " + Meow_Name + "=" + Meow_fullName + ";";
					namespace += "if(!" + Meow_fullName + ")" + Meow_fullName + "=" + Meow_Name + ";";
				}
				_private.exports = namespace + "build.label" + build.name + "():";

				// Still coding... Will be updated soon!
			}
		}
	});
});
