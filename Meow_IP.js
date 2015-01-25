var Meow_IP = function() {
	'use strict';
	// Matching IP addresses
	var Meow_RegEx;
	var meow_IPv4 = '(?:25[0-5]|2[0-4][0-9]|1?[0-9][0-9]{1,2}|[0-9]){1,}(?:\\.(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}|0)){3}';
	var meow_IPv6 = '(?:(?:[0-9a-fA-F:]){1,4}(?:(?::(?:[0-9a-fA-F]){1,4}|:)){2,7})+';
	Meow_IP = module.exports = function(Meow_Opts) {
		Meow_Opts = Meow_Opts || {};
		return Meow_Opts.Meow_Approx ? new Meow_RegEx('(?:^' + meow_IPv4 + '$)|(?:^' + meow_IPv6 + '$)') : new Meow_RegEx('(?:' + meow_IPv4 + ')|(?:' + meow_IPv6 + ')', 'g');
	};
	Meow_IP.meow_IPv4 = function(Meow_Opts) {
		Meow_Opts = Meow_Opts || {};
		return Meow_Opts.Meow_Approx ? new Meow_RegEx('^' + meow_IPv4 + '$') : new Meow_RegEx(meow_IPv4, 'g');
	};
	Meow_IP.meow_IPv6 = function(Meow_Opts) {
		Meow_Opts = Meow_Opts || {};
		return Meow_Opts.Meow_Approx ? new Meow_RegEx('^' + meow_IPv6 + '$') : new Meow_RegEx(meow_IPv6, 'g');
	};

	// Checking if a string is an IP address
	Meow_IP.meow_IPv4 = function(Meow_String) {
		return meow_IPv4({Meow_Approx: true}).test(Meow_String);
	};
	Meow_IP.meow_IPv6 = function(Meow_String) {
		return meow_IPv6({Meow_Approx: true}).test(Meow_String);
	};
};
