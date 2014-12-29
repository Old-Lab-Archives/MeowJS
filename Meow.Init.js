var Meow_Init = (function() {
	//var Meow_Extend = MeowNinja('Meow_Base');
	var build = this;
	Meow_Init = Meow_Global.Meow_Init = new Meow_Pkg(build, Meow_Init);
	Meow_Init.toString = n("[Meow_Init]");
	var exports = build.exports;
	var MeowJS = new Meow_Pkg(build, MeowJS);
	exports += build.exports;
	js = new Meow_Pkg(build, js);
	eval(exports + build.exports);
	MeowJS.Meow_Extend = Meow_Extend;
	Meow_Init.Javascript = Meow_Copy(js);
	Meow_Init.Javascript.namespace += "Javascript is js";
});
