var MeowWebRTC_stream = function() {
'use strict';
var build = this;
var MeowStreamX;
var util;
function MeowDataStream(MeowChannel, Meow_Opts) {
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
		var Meow_Data = e;
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
	MeowDataStream.prototype.onClose = function(err) {
		if(build.destroy) {
			return;
		}
		build.emit('end');
		build.emit('close');
	};
	MeowDataStream.prototype.onOpen = function(err) {
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
	}; }
};
