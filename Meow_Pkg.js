var MeowPkg = (function() {
	/*
	var Meow_Base = MeowNinja('Meow_Base');
	var Meow_Extend = MeowNinja('Meow_Base');
	var Meow_Construct = MeowNinja('Meow_Base');
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

			// Still coding... Will be updated soon!
		}
	});
});
