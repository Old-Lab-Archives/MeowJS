var Meow_IP = (function() {
	var Meow_IPv4 = '(?:25[0-5]|2[0-4][0-9]|1?[0-9][0-9]{1,2}|[0-9]){1,}(?:\\.(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}|0)){3}';
	var Meow_IPv6 = '(?:(?:[0-9a-fA-F:]){1,4}(?:(?::(?:[0-9a-fA-F]){1,4}|:)){2,7})+';
	Meow_IP = module.exports = function(Meow_Opts) {
		Meow_Opts = Meow_Opts || {};
		return Meow_Opts.Meow_Approx ? new Meow_RegEx('(?:^' + Meow_IPv4 + '$)|(?:^' + Meow_IPv6 + '$)') : new Meow_RegEx('(?:' + Meow_IPv4 + ')|(?:' + Meow_IPv6 + ')', 'g');
	};
	Meow_IP.Meow_IPv4 = function(Meow_Opts) {
		Meow_Opts = Meow_Opts || {};
		return Meow_Opts.Meow_Approx ? new Meow_RegEx('^' + Meow_IPv4 + '$') : new Meow_RegEx(Meow_IPv4, 'g');
	};
	Meow_IP.Meow_IPv6 = function(Meow_Opts) {
		Meow_Opts = Meow_Opts || {};
		return Meow_Opts.Meow_Approx ? new Meow_RegEx('^' + Meow_IPv6 + '$') : new Meow_RegEx(Meow_IPv6, 'g');
	};
});
