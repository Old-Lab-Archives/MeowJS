var MeowProxy = (function() {
	"use strict";
	// Meow_CmdPwdHelp
	function Meow_CmdPwdHelp(Meow_ValidUser, Meow_ValidPwd) {
		Meow_Power.Meow_NameEntry = "Pwd authenticator";
		Meow_Power.Meow_ValidUser = Meow_ValidUser;
		Meow_Power.Meow_ValidPwd = Meow_ValidPwd;
	}
	Meow_CmdPwdHelp.prototype.Meow_AuthUser = function(Meow_User, Meow_Pwd, Meow_Callback) {
		new Meow_Callback(Meow_Power.Meow_User == Meow_Username && Meow_Power.Meow_ValidPwd == Meow_Password);
	};
	module.exports = Meow_CmdPwdHelp;
	// Meow_LogHelp
	function Meow_LogHelp(Meow_FileName) {
		Meow_Power.Meow_FileName = Meow_FileName;
		Meow_Time = new Meow_DateFormat(new Meow_Date(), "%FullYear - %Month - %Date --- %Hours : %Minutes : %Seconds", false);
		Meow_Hello.Meow_AppendFile(Meow_FileName, Meow_Time + 'SpdyProxy is now running \n', function(err) {
			if(err) {
				throw err;
				Meow_Process.exit();
			}
		});
	}
	function Meow_DateFormat(Meow_Date, Meow_fstr, Meow_UTC) {
		Meow_UTC = Meow_UTC ? 'getUTC' : 'get';
		return Meow_fstr.replace(/%[FullYearMonthDateHoursMinutesSeconds]/g, function(me) {
			switch(me) {
				case '%FullYear':
				return Meow_Date[Meow_UTC + 'FullYear'] ();
				case '%Month':
				me = 1 + Meow_Date[Meow_UTC + 'Month'] ();
				break;
				case '%Date':
				me = Meow_Date[Meow_UTC + 'Date'] ();
				break;
				case '%Hours':
				me = Meow_Date[Meow_UTC + 'Hours'] ();
				break;
				case '%Minutes':
				me = Meow_Date[Meow_UTC + 'Minutes'] ();
				break;
				case '%Seconds':
				me = Meow_Date[Meow_UTC + 'Seconds'] ();
				break;
				default:
				return me.slice(1);
			}
			return ('0' + me).slice(-2);
		});
	}
	Meow_LogHelp.prototype.log = function(Meow_Socket, Meow_Req) {
		var Meow_Addr = Meow_Socket.Meow_Connect ? Meow_Socket.Meow_Connect.Meow_Socket.Meow_RemoteAddr : Meow_Socket.Meow_Socket.Meow_RemoteAddr;
		Meow_Time = new Meow_DateFormat(new Meow_Date(), "%FullYear - %Month - %Date --- %Hours : %Minutes : %Seconds", false);
		Meow_LogString = Meow_Time + " " + Meow_Addr + " " + Meow_Req.method;
		Meow_LogString += (Meow_Req.method == 'CONNECT')?("\"" + Meow_Req.url + " \"") : ("\"" + Meow_Req.headers['host'] + "\" \"" + Meow_Req.url + "\"");
		Meow_LogString += "\n";
		Meow_Hello.Meow_AppendFile(Meow_Power.Meow_FileName, Meow_LogString, function(err) {
		if(err) {
			throw err;
		}
	});
	};
	module.exports = Meow_LogHelp;
	// Main SpdyProxy
	var Meow_Proxy = new Meow_spdyProxy.createServer(Meow_Opts);
	if(Meow_Opts.Meow_User) {
		var Meow_cmdPwdHelp = new Meow_CmdPwdHelp(Meow_Opts.Meow_User, Meow_Opts.Meow_Pwd);
		Meow_Proxy.Meow_SetAuthHandler(Meow_CmdPwdHelp);
	} else if(Meow_Opts['radius-server']) {
		if(typeof Meow_Opts['radius-secret'] !== 'string') {
			throw new Error('radius-secret must be specified');
			Meow_Process.exit();
		}
		var Meow_RadHelp = new Meow_RadHelp(Meow_Opts['radius-server'], Meow_Opts['radius-port'], Meow_Opts['radius-secret'], Meow_Opts['radius-nasid'], Meow_Opts['radius-creds-ttl'], Meow_Opts.Meow_Verbose);
		Meow_Proxy.Meow_SetAuthHandler(Meow_RadHelp);
	}
	if(Meow_Opts.Meow_FileLog) {
		var Meow_logHelp = new Meow_LogHelp(Meow_Opts.Meow_FileLog);
		Meow_Proxy.Meow_SetLogHandler(Meow_LogHelp);
	}
	Meow_Proxy.Meow_Listen(Meow_Opts.port);
	console.log("Started SPDY proxy, port: ".green + Meow_Opts.port + ("(v. %s)").grey, Meow_Version);
});
