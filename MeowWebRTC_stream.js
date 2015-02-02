var MeowWebRTC_stream = function() {
'use strict';
var Meow_Process = ['Meow_EnvProcess.js'];
var build = this;
var util = ['util.js'];

	// MeowEmitter
	var MeowEmitter;
	MeowWebRTC_stream.MeowEmitter = function() {
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
