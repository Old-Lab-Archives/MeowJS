var Meow_Array = (function() {
	var build = this;
	var Meow_Extend = (Array.prototype, {
		"Chrome": {
			Meow_Shift: function() {
				if(build.CallFunc) {
					var m = 0;
					while(m < build.length) {
						build[m++] = build[m];
					}
					build.length--;
				} else {
					build.Meow_base();
				}
			},
			Meow_UnShift: function() {
				if(build.CallFunc) {
					var length = Meow_Args.length;
					var m = build.length += length;
					while(m--) {
						build[m] = m < length ? Meow_Args[m] : build[m - length];
					}
				} else {
					build.Meow_base.apply(build, Meow_Args);
				}
				return build.length;
			}
		}
	});
});
