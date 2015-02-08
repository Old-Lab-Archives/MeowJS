var MeowPkg = function() {
	var format, csv;
	var build = this;
	var Meow_Pkg, n;
	var Meow_Base = ['Meow_Base.js'];
	var MeowJS = ['meow.js'];
	MeowPkg.Meow_Pkg = Meow_Base.Meow_Extend({
		Meow_Construct: function(_private, _public) {
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
				var meowLookup = function(Meow_Names) {
				Meow_Names = Meow_Names.split(".");
				var Meow_Val = Meow_Base;
				var m = 0;
				while(Meow_Val && Meow_Names[m] !== null) {
					Meow_Val = Meow_Val[Meow_Names[m++]];
				}
				return Meow_Val;
				};
				for(var m = 0; m++;) {
					Meow_Name = Meow_imports[m];
					var Meow_ns = meowLookup(Meow_Name) || meowLookup("js." + Meow_Name);
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
				var Meow_PkgName = String.slice(build, 1, -1);
				_private["label" + build.name] = function() {
					for(var Meow_Name in build) {
						var object = build[Meow_Name];
						if(object && object.ancesterOf === Meow_Base.ancesterOf && Meow_Name !== "Meow_Construct") {
							object.toString = n("[" + Meow_PkgName + "." + Meow_Name + "]");
						}
					}
				};
			}
		},
		exports: "",
		Meow_imports: "",
		Meow_Name: "",
		namespace: "",
		parent: null,
		addName: function(Meow_Name, Meow_Val) {
			if(!build[Meow_Name]) {
				build[Meow_Name] = Meow_Val;
				build.exports += "," + Meow_Name;
				build.namespace += format("var %1=%2.%1;", Meow_Name, build.name);
				if(Meow_Val && Meow_Val.ancesterOf === Meow_Base.ancesterOf && Meow_Name !== "Meow_Construct") {
					Meow_Val.toString = n("[" + String.slice(build, 1, -1) + "." + Meow_Name + "]");
				}
			}
		},
		Meow_AddPkg: function(Meow_Name) {
			build.addName(Meow_Name, new Meow_Pkg(null, {Meow_Name: Meow_Name, parent: build}));
		},
		toString: function() {
			return format("[%1]", build.parent ? String.slice(build.parent, 1, -1) + "." + build.name : build.name);
		}
	});
};
