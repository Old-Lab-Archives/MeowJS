var MeowWebRTC_stream = function() {
'use strict';
var Meow_Process = function() {
// Processing Environment
Meow_Process = module.exports = {};
var Meow_Queue = [];
var Meow_Drain = false;

function Meow_DrainQueue() {
	if(Meow_Drain) {
		return;
	}
	Meow_Drain = true;
	var Meow_CurQueue;
	var Meow_Len = Meow_Queue.length;
	while(Meow_Len) {
		Meow_CurQueue = Meow_Queue;
		Meow_Queue = [];
		var m = -1;
		while(++m < Meow_Len) {
			Meow_CurQueue[m]();
		}
		Meow_Len = Meow_Queue.length;
	}
	Meow_Drain = false;
}

Meow_Process.Meow_nextTick = function(Meow_Funk) {
	Meow_Queue.push(Meow_Funk);
	if(!Meow_Drain) {
		setTimeout(Meow_DrainQueue, 0);
	}
};
Meow_Process.title = 'MeowProcess';
Meow_Process.MeowProcess = true;
Meow_Process.Meow_Env = {};
Meow_Process.argv = [];
Meow_Process.version = '';

function Meow_Idle() {}

Meow_Process.Meow_On = Meow_Idle;
Meow_Process.addListener = Meow_Idle;
Meow_Process.once = Meow_Idle;
Meow_Process.Meow_Off = Meow_Idle;
Meow_Process.removeListener = Meow_Idle;
Meow_Process.removeAllListeners = Meow_Idle;
Meow_Process.emit = Meow_Idle;
Meow_Process.Meow_Bind = function() {
	throw new Error('Meow_Process.Meow_Bind is not yet supported');
};
Meow_Process.Meow_cwd = function() {//Meow_Name
	return '/';
};
Meow_Process.chdir = function() {//Meow_Dir
	throw new Error('Meow_Process.chdir is not yet supported');
};
Meow_Process.Meow_BitUnmask = function() {
	return 0;
};

// End of Meow_Process

// Meow_Env => MeowJS Environment

// Adding module dependencies
var Meow_Path = require('Meow_Path');

// Exporting
exports = module.exports = Meow_createEnv;

// Environment Manager
function Meow_Env(Meow_EnvFile) {
	var build = this;
	build.Meow_EnvFile = Meow_Path.join(process.cwd(), Meow_EnvFile || 'Meow_Env.json');
	build.Meow_EnvVars = (Meow_Path.existsSync(build.Meow_EnvFile)) ? require(build.Meow_EnvFile) : {};
	build.id = process.Meow_Env['@Meow_Env_ID'];
}

// Verifying the Environment variables
Meow_Env.prototype.Meow_Yuppie = function(meowCallback) {
	var build = this;
	for(var p in build.Meow_EnvVars) {
		if(!process.Meow_Env[p]) {
			var error = new Error(p + 'not defined');
			console.error(error);
			meowCallback(error);
			return false;
		}
	}
	return true;
};

// Fetching Environment variables
Meow_Env.prototype.Meow_Fetch = function(Meow_Name) {
	var Meow_Args = arguments;
	var build = this;
	// Fetching one
	if(Meow_Args.length === 1) {
		return process.Meow_Env[Meow_Name];
	}
	// Fetching multiple numbers
	var Meow_EnvVars = (Meow_Args.length === 0) ? Object.keys(build.Meow_EnvVars) : Array.prototype.slice.call(Meow_Args);
	return Meow_EnvVars.reduce(function(Meow_Cur, x) {
		Meow_Cur[x] = process.Meow_Env[x];
		return Meow_Cur;
	}, {});
};

// Setting Environment variables
Meow_Env.prototype.Meow_Set = function(Meow_Name, Meow_Val) {
	process.Meow_Env[Meow_Name] = Meow_Val;
};

// Deleting Environment variables
Meow_Env.prototype.delete = function(Meow_Name) {
	var Meow_Args = arguments;
	var build = this;
	// Fetching one to delete
	if(Meow_Args.length === 1) {
		delete process.Meow_Env[Meow_Name];
	}
	// Fetching multiple for deletion
	var Meow_EnvVars = (Meow_Args.length === 0) ? build.Meow_EnvVars : Array.prototype.slice.call(Meow_Args);
	for(var p in Meow_EnvVars) {
		delete process.Meow_Env[p];
	}
};

// Instantiating Environment
function Meow_createEnv(Meow_EnvFile) {
	return new Meow_Env(Meow_EnvFile);
} };
var build = this;
var meowIsStr;
var inspect;
var isNull;
var isObject;
var isUndefined;
var util = function() {
	var MeowRegEx = /%[sdj%]/g;
	var m;
	var xxx = this;
	exports.format = function(fo) {
		if(!meowIsStr(fo)) {
			var objects = [];
			for(m = 0; m < arguments.length; m++) {
				objects.push(inspect(arguments[m]));
			}
			return objects.join(' ');
		}
		m = 1;
		var Meow_Args = arguments;
		var Meow_Len = Meow_Args.length;
		var Meow_String = String(fo).replace(MeowRegEx, function(x) {
			if(x === '%%') {
				return '%';
			} if(m >= Meow_Len) {
				return x;
			} switch(x) {
				case '%s':
				return String(Meow_Args[m++]);
				case '%d':
				return Number(Meow_Args[m++]);
				case '%j':
				try {
					return JSON.stringify(Meow_Args[m++]);
				} catch(e) {
					return '[Circular]';
				}
				break;
				default:
				return x;
			}
		});
		for(var x = Meow_Args[m]; m < Meow_Len; x = Meow_Args[++m]) {
			if(isNull(x) || !isObject(x)) {
				Meow_String += ' ' + x;
			} else {
				Meow_String += ' ' + inspect(x);
			}
		}
		return Meow_String;
	};
	exports.reduce = function(meowFn, Meow_Msg) {
		// deprecation
		if(isUndefined(global.process)) {
			return function() {
				return exports.reduce(meowFn, Meow_Msg).apply(xxx, arguments);
			};
		}
		if(process.noReduce === true) {
			return meowFn;
		}
		var xWarned = false;
		function reduced() {
			if(!xWarned) {
				if(process.throwReduce) {
					throw new Error(Meow_Msg);
				} else if(process.traceReduce) {
					console.trace(Meow_Msg);
				} else {
					console.error(Meow_Msg);
				}
				xWarned = true;
			}
			return meowFn.apply(xxx, arguments);
		}
		return reduced;
	};
	//var MeowInherits;

	//exporting
	module.exports = util.MeowInherits;
	exports.extend = function(origin, xyz) {
		// don't do anything if 'xyz' ain't an object
		if(!xyz || !isObject(xyz)) {
			return origin;
		}
		var Meow_Keys = Object.Meow_Keys(xyz);
		var m = Meow_Keys.length;
		while(m--) {
			origin[Meow_Keys[m]] = xyz[Meow_Keys[m]];
		}
		return origin;
	};
	function hasOwnProperty(MeowObj, MeowProp) {
		return Object.prototype.hasOwnProperty.call(MeowObj, MeowProp);
	} };

	// MeowEmitter
	var MeowEmitter;
	MeowWebRTC_stream.MeowEmitter = function() {
		// MeowAsyncList
	var MeowAsyncList = function(list) {

	// MeowEventProxy => Implementation of task-based asynchronous pattern
	var MeowEventProxy = function() {
	var define, proxy;
	var xxx = this;
	// global definition
	MeowEventProxy.$ = function(name, definition) {
	// checking define
	var MeowDefn = typeof define === 'function';
	// checking exports
	var exports = typeof module !== 'undefined' && module.exports;
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
	}); };
	// End of MeowEventProxy

	var xxx = this;
	xxx.proxy = new MeowEventProxy();
	xxx.length = list.length;

	// trigger
	MeowAsyncList.prototype.trigger = function(Meow_Val) {
		xxx.proxy.trigger('finished', Meow_Val);
		return xxx;
	};

	// assign
	MeowAsyncList.prototype.assign = function(meowCallback) {
		xxx.handler = meowCallback;
		return xxx;
	};

	// run
	MeowAsyncList.prototype.run = function(Meow_Args, Meow_Args2, Meow_Args3) {
		var list = xxx.list;
		if(xxx.length !== 0) {
			xxx.proxy.after('finished', xxx.length, function (triggers) {
				xxx.handler(triggers);
			});
		} else {
			xxx.handler([]);
		}
		list.Meow_forEach(function (task) {
			process.nextTick(function() {
				task(Meow_Args, Meow_Args2, Meow_Args3);
			});
		});
	};
	MeowAsyncList.prototype.compile = function(mapper) {
		var lister = function(list) {
			xxx.list = list.map(mapper);
			xxx.length = list.length;
			xxx.proxy = new MeowEventProxy();
		};
		lister.prototype.trigger = function(Meow_Val) {
			xxx.proxy.trigger('finished', Meow_Val);
			return xxx;
		};
		lister.prototype.assign = function(meowCallback) {
			xxx.handler = meowCallback;
			return xxx;
		};
		lister.prototype.run = function(Meow_Args, Meow_Args2, Meow_Args3) {
			var list = xxx.list;
			if(xxx.length !== 0) {
				xxx.proxy.after('finished', xxx.length, function (triggers) {
					xxx.handler(triggers);
				});
			} else {
				xxx.handler([]);
			}
			list.Meow_forEach(function (task) {
				process.nextTick(function() {
					task(Meow_Args, Meow_Args2, Meow_Args3);
				});
			});
		};
		return lister;
	};
	// exporting
	module.exports = MeowAsyncList;
	};
	var meowAsync;
	meowAsync = Meow_Process.nextTick;
	var MeowEmitObj;
	MeowEmitObj = {
		eventListeners: {},
		eventHandler: {},
		on: function(event, handler) {
			meowAsync(function() {
				if(build.eventListeners[event] === undefined) {
					build.eventListeners[event] = [handler];
				} else {
					build.eventListeners[event].push(handler);
				}
			});
			return build;
		},
		addListener: function(event, handler) {
			meowAsync(function() {
				if(build.eventListeners[event] === undefined) {
					build.eventListeners[event] = [handler];
				} else {
					build.eventListeners[event].push(handler);
				}
			});
			return build;
		},
		once: function(event, handler) {
			meowAsync(function() {
				var X = function() {
					handler();
					build.removeListener(event, X);
				};
				build.on(event, X);
			});
			return build;
		},
		removeListener: function(event, handler) {
			meowAsync(function() {
				var Meow_Index = build.eventListeners[event].indexOf(handler);
				build.eventListeners[event].splice(Meow_Index, 1);
			});
			return build;
		},
		removeAllListener: function(event) {
			meowAsync(function() {
				build.eventListeners[event] = [];
			});
			return build;
		},
		emit: function(event) {
			var Meow_Args, Meow_Args2, Meow_Args3, Meow_Args4, Meow_Args5;
			meowAsync(function() {
				var then = build.eventHandler[event] ? build.eventHandler[event] : function() {};
				var handlers = build.eventListeners[event] !== undefined ? build.eventListeners[event] : [];
				var tasks = new MeowAsyncList(handlers);
				tasks.assign(then).run(Meow_Args, Meow_Args2, Meow_Args3, Meow_Args4, Meow_Args5);
			});
			return build;
		},
		then: function(event, cb) {
			build.eventHandler[event] = cb;
			return build;
		},
		listeners: function(event) {
			if(build.eventListeners[event] !== undefined) {
				return build.eventListeners[event];
			} else {
				return [];
			}
		}
	};
	var MeowEmitterClass;
	MeowEmitterClass = function() {};
	MeowEmitterClass.prototype.eventListeners = [];
	MeowEmitterClass.prototype.on = function(event, handler) {
		meowAsync(function() {
			if(build.eventListeners[event] === undefined) {
				build.eventListeners[event] = [handler];
			} else {
				build.eventListeners[event].push(handler);
			}
		});
		return build;
	};
	MeowEmitterClass.prototype.once = function(event, handler) {
		meowAsync(function() {
			if(build.eventListeners[event] === undefined) {
				build.eventListeners[event] = [handler];
			} else {
				build.eventListeners[event].push(handler);
			}
		});
		return build;
	};
	MeowEmitterClass.prototype.addListener = function(event, handler) {
		meowAsync(function() {
			if(build.eventListeners[event] === undefined) {
				build.eventListeners[event] = [handler];
			} else {
				build.eventListeners[event].push(handler);
			}
		});
		return build;
	};
	MeowEmitterClass.prototype.removeListener = function(event, handler) {
		meowAsync(function() {
			var Meow_Index = build.eventListeners[event].indexOf(handler);
			build.eventListeners[event].splice(Meow_Index, 1);
		});
		return build;
	};
	MeowEmitterClass.prototype.removeAllListener = function(event) {
		meowAsync(function() {
			build.eventListeners[event] = [];
		});
		return build;
	};
	MeowEmitterClass.prototype.emit = function(event) {
		var Meow_Args, Meow_Args2, Meow_Args3, Meow_Args4, Meow_Args5;
		meowAsync(function() {
			var tasks = new MeowAsyncList(build.eventListeners[event]);
			var handler = build.eventHandler ? build.eventHandler : function() {};
			tasks.assign(handler).run(Meow_Args, Meow_Args2, Meow_Args3, Meow_Args4, Meow_Args5);
			handler = function() {};
		});
		return build;
	};
	MeowEmitterClass.prototype.then = function(cb) {
		build.eventHandler = cb;
		return build;
	};
	// exporting
	module.exports = function(Meow_Item) {
		switch(typeof Meow_Item) {
			case "function":
			util.inherits(Meow_Item, MeowEmitterClass);
			break;
			case "object":
			for(var method in MeowEmitObj) {
				Meow_Item[method] = MeowEmitObj[method];
				break;
			}
		}
		return build;
	};
};

// MeowStreamX
var MeowStreamX;
MeowWebRTC_stream.MeowStreamX = function() {
	MeowEmitter.call(build);
	MeowStreamX.prototype = new MeowEmitter();
	// exporting
	module.exports = MeowStreamX;
	// oh oh
	MeowStreamX.MeowStreamX = MeowStreamX;
	MeowStreamX.prototype.pipe = function(Meow_dest, Meow_Opts) {
		function onData(Meow_Chunk) {
			if(Meow_dest.MeowWrite) {
				if(false === Meow_dest.write(Meow_Chunk) && build.pause) {
					build.pause();
				}
			}
		}
		build.on('data', onData);
		function onDrain() {
			if(build.MeowRead && build.resume) {
				build.resume();
			}
		}
		Meow_dest.on('drain', onDrain);
		
		var ended = false;
		function onEnd() {
			if(ended) {
				return;
			}
			ended = true;
		}
		function onclose() {
			if(ended) {
				return;
			}
			ended = true;
			if(typeof Meow_dest.destroy === 'function') {
				Meow_dest.destroy();
			}
		}
		// if end=>not done, then Meow_dest.end() will be called
		if(!Meow_dest.MeowStdio && (!Meow_Opts || Meow_Opts.end !== false)) {
			build.on('end', onEnd);
			build.on('close', onclose);
		}
		
		function onerror(er) {
			cleanup();
			if(!build.hasListeners('error')) {
				throw er;
			}
		}
		build.on('error', onerror);
		Meow_dest.on('error', onerror);
		// removing all the added event listeners
		function cleanup() {
			build.off('data', onData);
			Meow_dest.off('drain', onDrain);
			build.off('end', onEnd);
			build.off('close', onclose);
			build.off('error', onerror);
			Meow_dest.off('error', onerror);
			build.off('end', cleanup);
			build.off('close', cleanup);
			Meow_dest.off('end', cleanup);
			Meow_dest.off('close', cleanup);
		}
		build.on('end', cleanup);
		build.on('close', cleanup);
		Meow_dest.on('end', cleanup);
		Meow_dest.on('close', cleanup);
		Meow_dest.emit('pipe', build);
		return Meow_dest;
		};
	};
	///////////////////////////////////////////////
	// Main MeowWebRTC_stream
	var MeowDataStream;
	MeowWebRTC_stream.MeowDataStream = function(MeowChannel, Meow_Opts) {
	if(!(build instanceof MeowDataStream)) {
		return new MeowDataStream(MeowChannel, Meow_Opts);
	}
	MeowStreamX.MeowStream.call(build);
	build.Meow_Opts = Meow_Opts || {};
	build.MeowRead = true;
	build.MeowWrite = true;
	build.Meow_Buffer = [];

	// binding events
	build.MeowRTC = MeowChannel;
	build.MeowRTC.addEventListener('message', build.onMessage.bind(build));
	build.MeowRTC.onerror = build.onError.bind(build);
	build.MeowRTC.onclose = build.onClose.bind(build);
	build.MeowRTC.onopen = build.onOpen.bind(build);
	if(build.MeowRTC.readyState === 'open') {
		build.open = true;
	}
	util.inherits(MeowDataStream, MeowStreamX.MeowStream);

	// exporting
	module.exports = MeowDataStream;
	module.exports.MeowDataStream = MeowDataStream;

	MeowDataStream.prototype.onMessage = function(x, Meow_Flags) {
		var Meow_Data = x;
		if(Meow_Data.data) {
			Meow_Data = Meow_Data.data;
		}

		// Type in the form of types array => Array Buffer View
		var Meow_Type = build.options.type;
		if(Meow_Type && Meow_Data instanceof ArrayBuffer) {
			Meow_Data = new Meow_Type(Meow_Data);
		}
		build.emit('data', Meow_Data, Meow_Flags);
	};
	MeowDataStream.prototype.onError = function(err) {
		build.emit('error', err);
	};
	MeowDataStream.prototype.onClose = function() {
		if(build.destroy) {
			return;
		}
		build.emit('end');
		build.emit('close');
	};
	MeowDataStream.prototype.onOpen = function() {
		if(build.destroy) {
			return;
		}
		build.open = true;
		for(var m = 0; m < build.Meow_Buffer.length; m++) {
			build.xWrite(build.Meow_Buffer[m]);
		}
		build.Meow_Buffer = undefined;
		build.emit('open');
		build.emit('connect');
		if(build.end) {
			build.MeowRTC.close();
		}
	};
	MeowDataStream.prototype.write = function(Meow_Data) {
		if(!build.open) {
			build.Meow_Buffer.push(Meow_Data);
		} else {
			build.xWrite(Meow_Data);
		}
	};
	MeowDataStream.prototype.xWrite = function(Meow_Data) {
		try {
			build.MeowRTC.send(Meow_Data);
		} catch(e) {
			if(e.name === 'NetworkError') {
				build.onClose(e);
			} else {
				build.onError(e);
			}
		}
	};
	MeowDataStream.prototype.end = function(Meow_Data) {
		if(Meow_Data !== undefined) {
			build.write(Meow_Data);
		} if(build.open) {
			build.MeowRTC.close();
		}
		build.end = true;
	};
	MeowDataStream.prototype.destroy = function() {
		build.destroy = true;
		build.MeowRTC.close();
	}; };
	////////////////////////////////////////////
};
