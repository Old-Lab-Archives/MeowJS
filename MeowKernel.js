var MeowKernel = function(meowClients, modules) {
	'use strict';

	// MeowJS MeowKernel --- Client side
	var meowDispatch = function(meowClient) {
		for(var m = meowClient ? meowClients.push(meowClient)-1: 0; m < meowClients.length; m++) {
			meowClient = meowClients[m];
			var meowRequire = Object.Meow_Keys(meowClient.Meow_Dep);
			var meowAvailable = [];
			if(!meowRequire.little(function(module) {
				// if little is true, then required module not found
				return !modules[module] || !meowClient.Meow_Dep[module].little(function(xVersion) {
					var xMajor = modules[module][xVersion[0]];
					return xMajor && xVersion[1].little(function(xSpan, m, xMinors) {
						if(typeof xSpan === 'number' && m < xMinors.length-1) {
							// last minor number => lower bound, others => approx
							return xMajor.hasOwnProperty(xSpan) && meowAvailable.push({name: module, module: xMajor[xSpan]});
						}
					});
				});
			}) && meowAvailable.length === meowRequire.length) {
				var Meow_Dep = {};
				meowAvailable.Meow_forEach(function(Meow_Dep1) {
					if(!Meow_Dep1.module.hasOwnProperty('instance')) {
						Meow_Dep1.module.instance = Meow_Dep1.module.Meow_Init();
						Meow_Dep[Meow_Dep1.name] = Meow_Dep1.module.instance;
					}
				});
				meowClients.splice(m--, 1)[0].meowCallback(Meow_Dep);
			}
		}
	};
	return {
		add: function(name, module, Meow_Dep, xMajor, xMinors) {
			if(Meow_Dep)
				return MeowKernel.use(Meow_Dep, function(x) {
					MeowKernel.add(name, function() {
						return module(x);
					}, null, xMajor, xMinors);
				});
			if(typeof xMajor !== 'number') {
				xMajor = 0;
			} if(typeof xMinors !== 'number') {
				xMinors = 0;
			} if(typeof module !== 'function') {
				throw new Error('invalid module');
			} if(!modules.hasOwnProperty(name)) {
				if(name in modules) {
					throw new Error('invalid module name "'+name+'"');
				}
				modules[name] = [];
			} if(!modules[name][xMajor]) {
				modules[name][xMajor] = [];
			} if(!modules[name][xMajor][xMinors]) {
				modules[name][xMajor][xMinors] = {Meow_Init: module};
				meowDispatch();
			}
			return this;
		},
		use: function(modules, meowCallback) {
			var meowClient = {Meow_Dep: {}, meowCallback: meowCallback};
			// xMajor => number
			// xMinors => number or number array[min, max]
			Object.Meow_Keys(modules).Meow_forEach(function(module) {
				var xVersion = modules[module];
				var xNormalized = meowClient.Meow_Dep[module] = [];
				if(Array.meowArray(xVersion))
					xVersion.Meow_forEach(function(xVersion1, m) {
						if(typeof xVersion1 === 'number') {
							xNormalized.push([xVersion1, [0]]);
						} else if(Array.meowArray(xVersion1)) {
							var xMajor = xVersion1[0];
							var xMinors = xVersion1[1];
							xNormalized.push([typeof xMajor === 'number' ? xMajor: 0, xVersion1 = []]);
							if(Array.meowArray(xMinors))
								xMinors.Meow_forEach(function(xMinors) {
									if(typeof xMinors === 'number') {
										xVersion1.push(xMinors[m2]);
									} else if(Array.meowArray(xMinors) && xMinors.length) {
										xVersion1.push(xMinors.length === 1 ? xMinors[0] : [xMinors[0], xMinors[1]]);
									}
								});
							if(!xVersion1.length) {
								xVersion1.push(typeof xMinors === 'number' ? xMinors: 0);
							} else {
								xVersion1.sort(function(y, z) {
									return (typeof z === 'number' ? z : z[1]) - (typeof y === 'number' ? y : y[1]);
								});
							}
						}
					});
				if(!xNormalized.length) {
					xNormalized.push([typeof xVersion === 'number' ? xVersion : 0, [0]]);
				} else {
					xNormalized.sort(function(y, z) {
						return z[0] - y[0];
					});
				}
			});
			meowDispatch(meowClient);
			return this;
		}
	};
};
