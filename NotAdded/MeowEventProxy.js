// MeowEventProxy => Implementation of task-based asynchronous pattern
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
		//////////////////////////////
		// declarations
		var MeowSlice = Array.prototype.slice;
		var MeowConcat = Array.prototype.concat;
		var MeowAllEvent = 'all';
		/////////////////
		var MeowEventProxyy;
		MeowEventProxy.MeowEventProxyy = function() {
			if(!(xxx instanceof MeowEventProxyy)) {
				return new MeowEventProxyy();
			}
			xxx.meowCallback = {};
			xxx.meowFired = {};
		};

		// Event Binding
		MeowEventProxyy.prototype.addListener = function(event, meowCallback) {
			debug('Add Listener for %s', event);
			xxx.meowCallback[event] = xxx.meowCallback[event] || [];
			xxx.meowCallback[event].push(meowCallback);
			return xxx;
		};
		MeowEventProxyy.prototype.bind = MeowEventProxyy.prototype.addListener;
		MeowEventProxyy.prototype.on = MeowEventProxyy.prototype.on;
		MeowEventProxyy.prototype.subscribe = MeowEventProxyy.prototype.subscribe;
		MeowEventProxyy.prototype.headbind = function(event, meowCallback) {
			debug('Add Listener for %s', event);
			xxx.meowCallback[event] = xxx.meowCallback[event] || [];
			xxx.meowCallback[event].unshift(meowCallback);
			return xxx;
		};
	//
	// Still more to code
	//
	});
};
