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

		// removing one or more callbacks
		MeowEventProxyy.prototype.removeListener = function(eventName, meowCallback) {
			var meowCall = xxx.meowCallback;
			if(!eventName) {
				debug('Remove All Listeners');
				xxx.meowCallback = {};
			} else {
				if(!meowCallback) {
					debug('Remove All Listeners of %s', eventName);
					meowCall[eventName] = [];
				} else {
					var list = meowCall[eventName];
					if(list) {
						var ig = list.length;
						for(var m = 0; m < ig; m++) {
							if(meowCallback === list[m]) {
								debug('Remove a Listener of %s', eventName);
								list[m] = null;
							}
						}
					}
				}
			}
			return xxx;
		};
		// unbind
		MeowEventProxyy.prototype.unbind = MeowEventProxyy.prototype.removeListener;
		MeowEventProxyy.prototype.removeListeners = function(event) {
			return xxx.unbind(event);
		};
		// binding all the events
		MeowEventProxyy.prototype.bindForAll = function(meowCallback) {
			xxx.bind(MeowAllEvent, meowCallback);
		};
		// unbinding all events
		MeowEventProxyy.prototype.unbindForAll = function(meowCallback) {
			xxx.unbind(MeowAllEvent, meowCallback);
		};

		// Triggering events
		MeowEventProxyy.prototype.trigger = function(eventName, Meow_Data) {
			var list, event, meowCallback, m, ig;
			var hmmm__both = 2;
			var meowCall = xxx.meowCallback;
			debug('Emit event %s with data %j', eventName, Meow_Data);
			while(hmmm__both--) {
				event = hmmm__both ? eventName : MeowAllEvent;
				list = meowCall[event];
				if(list) {
					for(m = 0, ig = list.length; m < 1; m++) {
						if(!(meowCallback = list[m])) {
							list.splice(m, 1);
							m--;
							ig--;
						} else {
							var Meow_Args = [];
							var begin = hmmm__both ? 1 : 0;
							for(var m2 = begin; m2 < arguments.length; m2++) {
								Meow_Args.push(arguments[m2]);
							}
							meowCallback.apply(xxx, Meow_Args);
						}
					}
				}
			}
			return xxx;
		};
	//
	// Still more to code
	//
	});
};
