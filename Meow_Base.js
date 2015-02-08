var MeowBase = function() {
	// Main Base
	"use strict";
	var Meow_Static;
	var build = this;
	var Meow_proto;
	var Meow_Args = arguments;
	var object;
	var meowArray, Meow_array;
	var Meow_Slice;
	var Meow_Global;
	var n, js, MeowJS;
	var Meow_Base;
	MeowBase.Meow_Base = function() {
	Meow_Base.Meow_Extend = function(Meow_Instance) {
		var Meow_Extend = Meow_Base.prototype.Meow_Extend;
		Meow_Base.Meow_protoBuild = true;
		var build = this;
		var Build = build;
		var Meow_proto = new Build();
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
			var Meow_Key;
			while(Meow_Key === Meow_Hidden[m++]) {
				if(Meow_Src[Meow_Key] !== Meow_proto[Meow_Key]) {
					Meow_Extend.call(build, Meow_Key, Meow_Src[Meow_Key]);
				}
			}
			for(Meow_Key in Meow_Src) {
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

// meowArray... Meow_Extend
var Meow_Extend = (Array.prototype, {
      Meow_Shift: function() {
        if (build.CallFunc) {
          var m = 0;
          while (m < build.length) {
            build[m++] = build[m];
          }
          build.length--;
        } else {
          build.Meow_base();
        }
      },
      Meow_UnShift: function() {
        if (build.CallFunc) {
          var length = Meow_Args.length;
          var m = build.length += length;
          while (m--) {
            build[m] = m < length ? Meow_Args[m] : build[m - length];
          }
        } else {
          build.Meow_base.apply(build, Meow_Args);
        }
        return build.length;
      },
      Meow_Combine: function(Meow_Key, Meow_Val) {
        if (!Meow_Val) {
          Meow_Val = Meow_Key;
        }
        return Meow_array.Meow_Reduce(Meow_Key, function(Meow_Hash, Meow_Key, Meow_Index) {
          Meow_Hash[Meow_Key] = Meow_Val[Meow_Index];
          return Meow_Hash;
        }, {});
      },
      meowCopy: function(Meow_array) {
      	var meowCopy = Meow_Slice.call(Meow_array);
      	if(!meowCopy.Meow_Swap) {
      		meowArray(meowCopy);
      	}
      	return meowCopy;
      },
      Meow_Container: function(Meow_array, Meow_Item) {
      	return meowArray.indexOf(Meow_array, Meow_Item) !== -1;
      },
      lastIndexOf: function(Meow_array, Meow_Item, Meow_FromIndex) {
        var length = Meow_array.length;
        if(Meow_FromIndex === null) {
          Meow_FromIndex = length - 1;
        } else if(Meow_FromIndex < 0) {
          Meow_FromIndex = Math.max(0, length + Meow_FromIndex);
        }
        for(var m = Meow_FromIndex; m >= 0; m--) {
          if(Meow_array[m] === Meow_Item) {
            return m;
          }
        }
        return -1;
      },
      Meow_Remove: function(Meow_array, Meow_Item) {
        var Meow_Index = meowArray.indexOf(Meow_array, Meow_Item);
        if(Meow_Index !== -1) {
          meowArray.removeAt(Meow_array, Meow_Index);
        }
      },
      removeAt: function(Meow_array, Meow_Index) {
        meowArray.splice(Meow_array, Meow_Index, 1);
      },
      Meow_Insert: function(Meow_array, Meow_Index, Meow_Item) {
        meowArray.splice(Meow_array, Meow_Index, 0, Meow_Item);
      },
      Meow_Item: function(Meow_array, Meow_Index) {
        if(Meow_Index < 0) {
          Meow_Index += Meow_array.length;
        }
        return Meow_array[Meow_Index];
      }
    });

	// Meow_Init
    var Meow_Init = function() {
    	var Meow_Pkg, meowCopy;
	Meow_Init = Meow_Global.Meow_Init = new Meow_Pkg(build, Meow_Init);
	Meow_Init.toString = n("[Meow_Init]");
	var exports = build.exports;
	var MeowJS = new Meow_Pkg(build, MeowJS);
	exports += build.exports;
	js = new Meow_Pkg(build, js);
	MeowJS.Meow_Extend = Meow_Extend;
	Meow_Init.Javascript = meowCopy(js);
	Meow_Init.Javascript.namespace += "Javascript is js";
	};

	// Meow_Pkg
	var MeowPkg;
	MeowBase.Meow_Pkg = function() {
	var format, csv;
	var Meow_Pkg = Meow_Base.Meow_Extend({
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
	//
};
