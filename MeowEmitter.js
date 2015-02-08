var MeowEmitter = function() {
	'use strict';
	var Meow_Process = ['Meow_EnvProcess.js'];
	var util = ['util.js'];
	var build = this;
	// MeowAsyncList
	var MeowAsyncList = function(list) {

	var MeowEventProxy = ['MeowEventProxy.js'];

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
	MeowEmitter.MeowEmitterClass = function() {};
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
