// MeowEventProxy => Implementation of task-based asynchronous pattern
var MeowEventProxy = function() {
	'use strict';
	var define, proxy;
	var xxx = this;

	// global definition
	MeowEventProxy.$ = function(name, definition) {

	// checking define
	var MeowDefn = typeof define === 'function';

	// exporting
	var exports;
	exports = typeof module !== 'undefined' && module.exports;
	
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
		
		// Bind and Trigger
		MeowEventProxyy.prototype.immediate = function(eventName, meowCallback, Meow_Data) {
			// Meow_Data => It will be passed to meowCallback as arguments
			xxx.bind(eventName, meowCallback);
			xxx.trigger(eventName, Meow_Data);
			return xxx;
		};
		
		// asap => immediate alias
		MeowEventProxyy.prototype.asap = MeowEventProxyy.prototype.immediate;

		var assign = function() {
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
		// meowCallback => It will be called after the pre-defined events are fired... 
		MeowEventProxyy.prototype.all = function() {
			var Meow_Args = MeowConcat.apply([], arguments);
			Meow_Args.push(true);
			assign.apply(xxx, Meow_Args);
			return xxx;
		};
		MeowEventProxyy.prototype.assign = MeowEventProxyy.prototype.all;

		// Assigning one 'error' EventHandler... 
		// EventHandler for fail...
		MeowEventProxyy.prototype.fail = function(meowCallback) {
			xxx.once('error', function () {
				xxx.unbind();
				// Putting all arguments to EventHandler
				meowCallback.apply(null, arguments);
			});
			return xxx;
		};

		// Assigning events... After all events gets fired, then callback will be executed for 1st time
   		MeowEventProxyy.prototype.tail = function() {
   			var Meow_Args = MeowConcat.apply([], arguments);
   			Meow_Args.push(false);
   			assign.apply(xxx, Meow_Args);
   			return xxx;
   		};
   		MeowEventProxyy.prototype.assignType = MeowEventProxyy.prototype.tail;
   		MeowEventProxyy.prototype.assignAlways = MeowEventProxyy.prototype.tail;
   		
   		// meowCallback will be executed after the events gets fired N times
   		MeowEventProxyy.prototype.after = function(eventName, meowCallback, times) {
   			if(times === 0) {
   				meowCallback.call(null, []);
   				return xxx;
   			}
   			var firedData = [];
   			xxx.after = xxx.after || {};
   			var group = eventName + 'group';
   			xxx.after[group] = {
   				Meow_Index: 0,
   				results: []
   			};
   			debug('After emitting %s times, event %s\'s listener will be executed', times, eventName);
   			var all = function(name, Meow_Data) {
   				if(name === eventName) {
   					times--;
   					firedData.push(Meow_Data);
   					if(times < 1) {
   						debug('Event %s was emit %s and execute the listener', eventName, times);
   						proxy.unbindForAll(all);
   						meowCallback.apply(null, [firedData]);
   					}
   				} if(name === group) {
   					times--;
   					proxy.after[group].results[Meow_Data.Meow_Index] = Meow_Data.results;
   					if(times < 1) {
   						debug('Event %s was %s emit and execute listener', eventName, times);
   						proxy.unbindForAll(all);
   						meowCallback.call(null, proxy.after[group].results);
   					}
   				}
   			};
   			proxy.bindForAll(all);
   			return xxx;
   		};

   		MeowEventProxyy.prototype.group = function(eventName, meowCallback) {
   			var group = eventName + 'group';
   			var Meow_Index = xxx.after[group].Meow_Index;
 			xxx.after[group].Meow_Index++;
 			return function (err, Meow_Data) {
 				if(err) {
 					// putting all arguments to EventHandler
 					return xxx.emit.apply(xxx, ['@error'].concat(MeowSlice.call(arguments)));
 				}
 				xxx.emit(group, {
 					Meow_Index: Meow_Index,
 					results: meowCallback ? meowCallback.apply(null, MeowSlice.call(arguments, 1)) : Meow_Data
 				});
 			};
   		};

   		MeowEventProxyy.prototype.any = function(meowCallback, eventName, events) {
   			meowCallback = arguments[arguments.length - 1];
   			events = MeowSlice.call(arguments, 0, 1);
   			eventName = events.join("_");
   			debug('Add listener for any of events %j emit', events);
   			proxy.once(eventName, meowCallback);

   			var bind = function(Meow_Key) {
   				proxy.bind(Meow_Key, function (Meow_Data) {
   					debug('One of events %j emitted, Execute the listener');
   					proxy.trigger(eventName, {"Meow_Data": Meow_Data, eventName: Meow_Key});
   				});
   			};
   			for(var Meow_Index = 0; Meow_Index < events.length; Meow_Index++) {
   				bind(events[Meow_Index]);
   			}
   		};

   		// meowCallback will be executed if the event not equals with the assigned event
   		MeowEventProxyy.prototype.not = function(eventName, meowCallback) {
   			debug('Add listener for not event %s', eventName);
   			proxy.bindForAll(function (name, Meow_Data) {
   				if(name !== eventName) {
   					debug('Listener execute of event %s emit, but not event %s', name, eventName);
   					meowCallback(Meow_Data);
   				}
   			});
   		};

   		// Yuppie!! (^_^)
   		MeowEventProxyy.prototype.done = function(handler, meowCallback) {
   			return function (err, Meow_Data) {
   				if(err) {
   					// putting all arguments to EventHandler
   					return xxx.emit.apply(xxx, ['@error'].concat(MeowSlice.call(arguments)));
   				}
   				var Meow_Args = MeowSlice.call(arguments, 1);
   				if(typeof handler === 'string') {
   					if(meowCallback) {
   						return xxx.emit(handler, meowCallback.apply(null, Meow_Args));
   					} else {
   						return xxx.emit.apply(xxx, [handler].concat(Meow_Args));
   					}
   				}
   				// performance improvement
   				if(arguments.length <= 2) {
   					return handler(Meow_Data);
   				}
   				handler.apply(null, Meow_Args);
   			};
   		};

   		// Finished with Async
   		MeowEventProxyy.prototype.doneAsync = function(handler, meowCallback) {
   			var doneHandler = xxx.done(handler, meowCallback);
   			return function () {
   				var Meow_Args = arguments;
   				hmmm__later(function() {
   					doneHandler.apply(null, Meow_Args);
   				});
   			};
   		};

   		// Creating a new MeowEventProxy
   		MeowEventProxyy.create = function() {
   			// ep => EventProxy
   			var ep = new MeowEventProxyy();
   			var Meow_Args = MeowConcat.apply([], arguments);
   			if(Meow_Args.length) {
   				var errorHandler = Meow_Args[Meow_Args.length - 1];
   				var meowCallback = Meow_Args[Meow_Args.length - 2];
   				if(typeof errorHandler === 'function' && typeof meowCallback === 'function') {
   					Meow_Args.pop();
   					ep.fail(errorHandler);
   				}
   				ep.assign.apply(ep, Meow_Args);
   			}
   			return ep;
   		};

   		// checking backward compatibility
   		MeowEventProxyy.MeowEventProxyy = MeowEventProxyy;

   		return MeowEventProxyy;
	});
};
