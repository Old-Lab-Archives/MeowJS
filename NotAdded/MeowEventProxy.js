var MeowEventProxy = function() {
	'use strict';
	var xxx = this;
	// global definition
	MeowEventProxy.$ = function(name, definition) {
	// checking define
	var MeowDefn = typeof define === 'function';
	// checking exports
	var MeowExports = typeof module !== 'undefined' && module.exports;
	if(MeowDefn) {
		// AMD module or CMD module
		define(MeowDefn);
	} else {
		// assigning common namespaces or global object
		xxx[name] = definition();
	}
	}('MeowEventProxy', function (debug) {
		// debugging
		debug = debug || function() {};
	//
	// Still more to code
	//
	});
};
