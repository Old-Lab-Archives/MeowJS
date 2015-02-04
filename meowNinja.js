// MeowJS JS file Loader
	function meowNinja(src, cb) {
		// src => source
		// cb => callback
		var window;
		var ref = window.document.getElementsByTagName("script")[0];
		var script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
		if(cb && typeof(cb) === "function") {
			script.onLoad = cb;
		}
		return script;
	}
