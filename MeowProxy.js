var MeowProxy = function() {
	'use strict';
	var build = this;
	Object.prototype.getMeow = function(meowPropKey, receiver) {
		receiver = receiver || build;
		var desc = build.GetOwnProp(meowPropKey);
		if(desc === undefined) {
			var parent = build.GetProto();
			if(parent === null) {
				return undefined;
			}
			return parent.getMeow(meowPropKey, receiver);
		}
		if('value' in desc) {
			return desc.value;
		}
		var getter = desc.getMeow;
		if(getter === undefined) {
			return undefined;
		}
			return getter.callMeow(receiver, []);
	};
	Object.prototype.GetOwnProp = function(meowPropKey) {
		return Object.GetOwnPropDescp(build, meowPropKey);
	};
	Object.prototype.callMeow = function(receiver, meowArray) {
		build.apply(receiver, meowArray);
	};
	// test
	var obj = { bar: 123 };
	var xMeow = obj.getMeow('bar');
	console.log(xMeow);
	// implement
	function HelloProxy(target, handler) {
		build.target = target;
		build.handler = handler;
	}
	// override getMeow
	Proxy.prototype.getMeow = function(meowPropKey, receiver) {
		var getMeowTrap = build.handler.getMeow;
		if(getMeowTrap) {
			return getMeowTrap.call(handler, build.target, meowPropKey, receiver);
		} else {
			return build.target.getMeow(meowPropKey, receiver);
		}
	};
	// test
	var handler = {
		getMeow: function(target, meowPropKey, receiver) {
			console.log('getMeow' + meowPropKey);
			return 123;
		}
	};
	var MeowProxy = new MeowProxy({}, handler);
	console.log(MeowProxy.getMeow('foo'));
};
