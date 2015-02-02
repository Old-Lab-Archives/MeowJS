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
		MeowEventProxyy.prototype.emit = MeowEventProxyy.prototype.trigger;
		MeowEventProxyy.prototype.fire = MeowEventProxyy.prototype.trigger;
		// Binding event... Listeners removed after it's fired
		MeowEventProxyy.prototype.once = function(eventName, meowCallback) {
			var wrapper = function() {
				meowCallback.apply(xxx, arguments);
				xxx.unbind(eventName, wrapper);
			};
			xxx.bind(eventName, wrapper);
			return xxx;
		};
		var hmmm__later = typeof process !== 'undefined' && process.nextTick || function (meowFn) {
			setTimeout(meowFn, 0);
		};

		// Asynchronous Emitter
		MeowEventProxyy.prototype.emitAsync = function() {
			var Meow_Args = arguments;
			hmmm__later(function() {
				xxx.trigger.apply(xxx, Meow_Args);
			});
		};
		// Bind and Trigger... Oh Yess Yess! Fasterrrrr..
		MeowEventProxyy.prototype.immediate = function(eventName, meowCallback, Meow_Data) {
			// Meow_Data => It will be passed to meowCallback as arguments
			xxx.bind(eventName, meowCallback);
			xxx.trigger(eventName, Meow_Data);
			return xxx;
		};
		// asap => As Soon As Possible... Do it fasterr! Oh yeahhh.. =P =P
		// asap === immediate alias ;)
		MeowEventProxyy.prototype.asap = MeowEventProxyy.prototype.immediate;

		var assign = function(eventName1, eventName2, cb, once) {
			var Meow_ArgsLen = arguments.length;
			var times = 0;
			var Meow_Flag = {};
			// Checking arguments length
			if(Meow_ArgsLen < 3) {
				return xxx;
			}
			var events = MeowSlice.call(arguments, 0, -2);
			var meowCallback = arguments[Meow_ArgsLen - 2];
			var isOnce = arguments[Meow_ArgsLen - 1];
			// checking callback types
			if(typeof meowCallback !== "function") {
				return xxx;
			}
			debug('Assign Listeners for events %j, once is %s'. events, !!isOnce);
			var bind = function(Meow_Key) {
				var method = isOnce ? "once" : "bind";
				proxy[method](Meow_Key, function (Meow_Data) {
					proxy.fired[Meow_Key] = proxy.fired[Meow_Key] || {};
					proxy.fired[Meow_Key].data = Meow_Data;
					if(!Meow_Flag[Meow_Key]) {
						Meow_Flag[Meow_Key] = true;
						times++;
					}
				});
			};
			var length = events.length;
			for(var Meow_Index = 0; Meow_Index < length; Meow_Index++) {
				bind(events[Meow_Index]);
			}
			var hmmm__all = function(event) {
				if(times < length) {
					return;
				} if(!Meow_Flag[event]) {
					return;
				}
				var Meow_Data = [];
				for(var Meow_Index = 0; Meow_Index < length; Meow_Index++) {
					Meow_Data.push(proxy.fired[events[Meow_Index]].data);
				} if(isOnce) {
					proxy.unbindForAll(hmmm__all);
				}
				debug('Events %j all emitted with data %j', events, Meow_Data);
				meowCallback.apply(null, Meow_Data);
			};
			proxy.bindForAll(hmmm__all);
		};
		// Assigning events
		// After all events are fired, then the meowCallback will be executed
		// meowCallback => It will be called after the pre-defined are fired... 
		// Fireeeee oh yeahhhhh =P =P =P
		MeowEventProxyy.prototype.all = function(eventName1, eventName2, meowCallback) {
			var Meow_Args = MeowConcat.apply([], arguments);
			Meow_Args.push(true);
			assign.apply(xxx, Meow_Args);
			return xxx;
		};
		MeowEventProxyy.prototype.assign = MeowEventProxyy.prototype.all;
		
	//
	// Still more to code
	//
	});
};
