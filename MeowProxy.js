var MeowProxy = (function() {
	"use strict";
	var Meow_Proxy = new Meow_spdyProxy.createServer(Meow_Opts);
	if(Meow_Opts.Meow_User) {
		var Meow_CmdPwdHelp = new Meow_CmdPwdHelp(Meow_Opts.Meow_User, Meow_Opts.Meow_Pwd);
		Meow_Proxy.Meow_SetAuthHandler(Meow_CmdPwdHelp);
	} else if(Meow_Opts['radius-server']) {
		if(typeof Meow_Opts['radius-secret'] !== 'string') {
			throw new Error('radius-secret must be specified');
		}
		Meow_Process.exit();
		var Meow_RadHelp = new Meow_RadHelp(Meow_Opts['radius-server'], Meow_Opts['radius-port'], Meow_Opts['radius-secret'], Meow_Opts['radius-nasid'], Meow_Opts['radius-creds-ttl'], Meow_Opts.Meow_Verbose);
		Meow_Proxy.Meow_SetAuthHandler(Meow_RadHelp);
	}
	if(Meow_Opts.Meow_FileLog) {
		var Meow_LogHelp = new Meow_LogHelp(Meow_Opts.Meow_FileLog);
		Meow_Proxy.Meow_SetLogHandler(Meow_LogHelp);
	}
	Meow_Proxy.Meow_Listen(Meow_Opts.port);
	console.log("Started SPDY proxy, port: ".green + Meow_Opts.port + ("(v. %s)").grey, Meow_Version);
});
