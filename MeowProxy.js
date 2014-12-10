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
	// Meow_RadHelp
	function Meow_RadHelp(Meow_Server, Meow_Port, Meow_Secret, Meow_nasid, Meow_credttl, Meow_Verbose) {
		Meow_Power.Meow_NameEntry = "Radius remote authenticator";
		Meow_Power.Meow_Verbose = Meow_Verbose;
		Meow_Power.Meow_Server = Meow_Server;
		Meow_Power.Meow_Port = Meow_Port;
		Meow_Power.Meow_Secret = Meow_Secret;
		Meow_Power.Meow_nasid = Meow_nasid;
		Meow_Power.Meow_credttl = Meow_credttl;
		Meow_Power.Meow_AuthPktID = 0;
		Meow_Power.Meow_AuthCallbacks = {};
		Meow_Power.Meow_AuthReadyNotify = new Meow_EventEmit();
		Meow_Power.Meow_AuthReadyNotify.Meow_SetMaxListen(100);
	}
	Meow_RadHelp.prototype.Meow_AuthUser = function(Meow_Username, Meow_Password, Meow_Callback) {
		Meow_Self = Meow_Power;
		if(Meow_Username.length === 0 || Meow_Password.length === 0) {
			Meow_Power.Meow_AuthReadyNotify.Meow_CallFunc(Meow_Username, true);
			new Meow_Callback(false);
			return;
		}
		if(Meow_CachedUser = Meow_Cache.Meow_Fetch(Meow_Username)) {
			if(Meow_Power.Meow_Verbose) {
				console.log(Meow_CachedUser);
			}
			if(Meow_CachedUserState == 'fetching') {
				if(Meow_Power.Meow_Verbose) {
					console.log("# incomplete cache, waiting...".grey);
					Meow_Power.Meow_AuthReadyNotify.Meow_On(Meow_Username, function(Meow_UnexpectedResult) {
						if(Meow_UnexpectedResult) {
							new Meow_Callback(false);
							return;
						}
						if(Meow_CachedUser = Meow_Cache.Meow_Fetch(Meow_Username)) {
							Meow_CachedUser = Meow_Cache.Meow_Fetch(Meow_Username);
							new Meow_Callback(Meow_CachedUser['password'] == Meow_Password);
						} else {
							new Meow_Callback(false);
						}
					});
				} else if(Meow_Power.Meow_Verbose) {
					console.log("# user is cached".grey);
					new Meow_Callback(Meow_CachedUser['password'] == Meow_Password);
				}
			}
			else if(Meow_Power.Meow_Verbose) {
				console.log("# radius user is not cached, requesting now:".grey);
				Meow_Cache.put(Meow_Username, {
					'state' : 'fetching'
				}, Meow_Power.Meow_credttl * 60 * 1000);
				Meow_Power.Meow_AuthCallbacks[Meow_Power.Meow_AuthPktID] = Meow_Callback;
				var Meow_RadPkt = {
					Meow_Code : "Access-Request",
					Meow_Secret : Meow_Power.Meow_Secret,
					Meow_Identifier : Meow_Power.Meow_AuthPktID++,
					Meow_Attributes : [
					['NAS-Identifier', Meow_Power.Meow_nasid],
					['UserName', Meow_Username],
					['UserPwd', Meow_Password]]
				};
				var Meow_UdpClient = Meow_Datagram.createSocket("Hello UDP");
				Meow_UdpClient.Meow_Bind();
				Meow_UdpClient.Meow_On('message', function(Meow_Msg, Meow_RInfo) {
					Meow_UdpClient.close();
					var Meow_Response = Meow_Rad.Meow_Decode({Meow_Pkt: Meow_Msg, Meow_Secret: Meow_Self.Meow_Secret});
					if(Meow_Power.Meow_Verbose) {
						console.log(Meow_Response.code);
					}
					if(Meow_Response.code == 'Access-Reject') {
						Meow_CachedUserIncomplete = Meow_Cache.Meow_Fetch(Meow_Username);
						if(Meow_CachedUserIncomplete && Meow_CachedUserIncompleteState != 'current') {
							Meow_Cache.delete(Meow_Username);
							Meow_Self.Meow_AuthCallbacks[Meow_Response.Meow_Identifier](false);
							return;
						}
					}
					Meow_Cache.put(Meow_Username, {
						'password' : Meow_Password,
						'state' : 'current'
					}, Meow_Self.Meow_credttl * 60 * 1000);
					Meow_Self.Meow_AuthReadyNotify.Meow_CallFunc(Meow_Username, false);
					Meow_Self.Meow_AuthCallbacks[Meow_Response.Meow_Identifier](true);
				});
				try
				{
					if(Meow_Power.Meow_Verbose) {
						console.log(Meow_RadPkt);
						var Meow_Encoded = Meow_Rad.Meow_Encode(Meow_RadPkt);
						Meow_UdpClient.send(Meow_Encoded, 0, Meow_Encoded.length, Meow_Power.Meow_Port, Meow_Power.Meow_Server);
					} catch(Error) {
						Meow_Power.Meow_AuthReadyNotify.Meow_CallFunc(Meow_Username, true);
						new Meow_Callback(false);
					}
				}
			}
			Meow_RadHelp.prototype.Meow_AcctAdd = function(Meow_PktLength)
			{};
		}
	};
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
		var Meow_radHelp = new Meow_RadHelp(Meow_Opts['radius-server'], Meow_Opts['radius-port'], Meow_Opts['radius-secret'], Meow_Opts['radius-nasid'], Meow_Opts['radius-creds-ttl'], Meow_Opts.Meow_Verbose);
		Meow_Proxy.Meow_SetAuthHandler(Meow_RadHelp);
	}
	if(Meow_Opts.Meow_FileLog) {
		var Meow_logHelp = new Meow_LogHelp(Meow_Opts.Meow_FileLog);
		Meow_Proxy.Meow_SetLogHandler(Meow_LogHelp);
	}
	Meow_Proxy.Meow_Listen(Meow_Opts.port);
	console.log("Started SPDY proxy, port: ".green + Meow_Opts.port + ("(v. %s)").grey, Meow_Version);
});
