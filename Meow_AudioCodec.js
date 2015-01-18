var Meow_AudioCodec = function(x, meowCodec) {
	'use strict';
	var meowAudioLib;
	var Meow_Power = this;
	var xx = x[0].toUpperCase() + x.substr(1).toLowerCase();
	Meow_AudioCodec[x] = meowCodec;
	// encode
	if(meowCodec.meowEncode) {
		meowAudioLib.meowAudioDevice.record.prototype['to' + xx] = function(meowBytesPerSample) {
			return Meow_AudioCodec[x].meowEncode({
				Meow_Data: Meow_Power.join(),
				Meow_SampleRate: Meow_Power.boundTo.Meow_SampleRate,
				Meow_ChannelCount: Meow_Power.boundTo.Meow_ChannelCount,
				meowBytesPerSample: meowBytesPerSample
			});
		};
	}
	// decode
	if(meowCodec.meowDecode) {
		meowAudioLib.xSample.prototype['load' + xx] = function(Meow_FileData) {
			Meow_Power.load.apply(Meow_Power, [Meow_AudioCodec[x].meowDecode(Meow_FileData)].concat([].slice.call(arguments, 1)));
		};
	}
	return meowCodec;
};
