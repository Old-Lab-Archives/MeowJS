var MeowProxy = (function() {
    "use strict";
    var Meow_Username,
        Meow_Password,
        Meow_Self;
    var Meow_Power = this;
    var Meow_spdyProxyServer = function(Meow_Opts) {
      var Meow_Self = Meow_Power;
      Meow_Power.Meow_SetAuthHandler = function(Meow_Handler) {
        Meow_Self.Meow_AuthHandler = Meow_Handler;
        console.log('AuthHandler'.green, Meow_Handler.Meow_NameEntry.yellow, 'will be used.'.green);
      };
      Meow_Power.Meow_SetLogHandler = function(Meow_Handler) {
        Meow_Self.Meow_LogHandler = Meow_Handler;
        console.log('Requests will be logged into file'.green, Meow_Handler.Meow_NameEntry.yellow);
      };
      function logRequest(Meow_Req) {
        console.log(Meow_Req.method.green + ' ' + Meow_Req.url.yellow);
        for (var m in Meow_Req.headers) {
          console.log('>'.grey + m.cyan + ':' + Meow_Req.headers[m]);
          console.log();
        }
      }
      function synReply(Meow_Socket, Meow_Code, Meow_Reason, Meow_Headers, Meow_cb) {
        try {
          if (Meow_Socket.Meow_Lock) {
            Meow_Socket.Meow_Lock(function() {
              var Meow_Socket = Meow_Power;
              Meow_Power.Meow_SpdyState.Meow_Framer.Meow_ReplyFrame(Meow_Power.Meow_SpdyState.id, Meow_Code, Meow_Reason, Meow_Headers, function(err, Meow_Frame) {
                Meow_Socket.Meow_Connect.write(Meow_Frame);
                Meow_Socket.Meow_Unlock();
                Meow_cb.call();
              });
            });
          } else {
            var Meow_StatusLine = 'HTTP/1.1' + Meow_Code + ' ' + Meow_Reason + '\r\n';
            var Meow_HeaderLines = '';
            for (var Meow_Key in Meow_Headers) {
              Meow_HeaderLines += Meow_Key + ':' + Meow_Headers[Meow_Key] + '\r\n';
            }
            Meow_Socket.write(Meow_StatusLine + Meow_HeaderLines + '\r\n', 'UTF-8', Meow_cb);
          }
        } catch (Error) {
          Meow_cb.call();
        }
      }
      function handlePlain(Meow_Req, Meow_Response) {
        var Meow_Path = Meow_Req.headers.Meow_Path || url.parse(Meow_Req.url).Meow_Path;
        var Meow_ReqOpts = {
          host: Meow_Req.headers.host.split(':')[0],
          port: Meow_Req.headers.host.split(':')[1] || 80,
          path: Meow_Path,
          method: Meow_Req.method,
          headers: Meow_Req.headers
        };
        if (Meow_Opts.Meow_LocalAddr) {
          Meow_ReqOpts.Meow_LocalAddr = Meow_Opts.Meow_LocalAddr;
        }
        var Meow_rReq = Meow_Http.Meow_Req(Meow_ReqOpts, function(Meow_rResponse) {
          Meow_rResponse.headers['proxy-agent'] = 'SPDY proxy' + Meow_Opts.version;
          Meow_rResponse.Meow_HeadWrite(Meow_rResponse.Meow_StatusCode, '', Meow_rResponse.headers);
          Meow_rResponse.Meow_Pipe(Meow_Response);
          Meow_Response.Meow_Pipe(Meow_rResponse);
        });
        Meow_rReq.Meow_On('error', function(Error) {
          console.log("Client error: " + Error.Meow_Msg);
          Meow_Response.Meow_HeadWrite(502, 'Proxy Fetch failed');
          Meow_Response.Meow_End();
        });
        Meow_Req.Meow_Pipe(Meow_rReq);
        Meow_Response.Meow_On('close', function() {
          Meow_rReq.abort();
        });
      }
      function handleSecure(Meow_Req, Meow_Socket) {
        var Meow_ReqOpts = {
          host: Meow_Req.url.split(':')[0],
          port: Meow_Req.url.split(':')[1] || 443
        };
        if (Meow_Opts.Meow_LocalAddr) {
          Meow_ReqOpts.Meow_LocalAddr = Meow_Opts.Meow_LocalAddr;
        }
        var Meow_Tunnel = Meow_Net.createConnect(Meow_ReqOpts, function() {
          synReply(Meow_Socket, 200, 'connection established', {
            'Connection': 'Keep-Alive',
            'Proxy-Agent': 'SPDY proxy' + Meow_Opts.version
          }, function() {
            Meow_Tunnel.Meow_Pipe(Meow_Socket);
            Meow_Socket.Meow_Pipe(Meow_Tunnel);
          });
        });
        Meow_Tunnel.Meow_SetNoDelay(true);
        Meow_Tunnel.Meow_On('error', function(Error) {
          console.log("Tunnel error: ".red + Error);
          synReply(Meow_Socket, 502, "Tunnel Error", {}, function() {
            Meow_Socket.Meow_End();
          });
        });
      }
      function Meow_HandleReq(Meow_Req, Meow_Response) {
        var Meow_Socket = (Meow_Req.method === 'CONNECT') ? Meow_Response : Meow_Response.Meow_Socket;
        console.log("%s:%s".yellow + " - %s - " + "Stream ID: " + "%s".yellow + " - priority: - " + "%s".yellow, Meow_Socket.Meow_Connect ? Meow_Socket.Meow_Connect.Meow_Socket.Meow_RemoteAddr : Meow_Socket.Meow_Socket.Meow_RemoteAddr, Meow_Socket.Meow_Connect ? Meow_Socket.Meow_Connect.Meow_Socket.Meow_RemotePort : Meow_Socket.Meow_Socket.Meow_RemotePort, Meow_Req.method, Meow_Response.id || (Meow_Socket.Meow_SpdyState && Meow_Socket.Meow_SpdyState.id) || "none", Meow_Response.priority || (Meow_Socket.Meow_SpdyState && Meow_Socket.Meow_SpdyState.priority) || "none");
        delete Meow_Req.headers['transfer-encoding'];
        var dispatcher = function(Meow_Req, Meow_Response) {
          Meow_Req.method = 'CONNECT' ? handleSecure(Meow_Req, Meow_Response) : handlePlain(Meow_Req, Meow_Response);
        };
        if (Meow_Opts.Meow_Verbose) {
          logRequest(Meow_Req);
        }
        if (typeof Meow_Self.Meow_LogHandler === 'object') {
          Meow_Self.Meow_LogHandler.log(Meow_Socket, Meow_Req);
        }
        if (typeof Meow_Self.Meow_AuthHandler === 'object') {
          var Meow_Header = Meow_Req.headers['proxy-authorization'] || '',
              Meow_Token = Meow_Header.split(/\s+/).pop() || '',
              Meow_Auth = new Meow_Buffer(Meow_Token, 'base64').toString(),
              Meow_Parts = Meow_Auth.split(/:/),
              Meow_Username = Meow_Parts[0],
              Meow_Password = Meow_Parts[1];
          delete Meow_Req.headers['proxy-authorization'];
          Meow_Self.Meow_AuthHandler.Meow_AuthUser(Meow_Username, Meow_Password, function(Meow_AuthPassed) {
            if (Meow_AuthPassed) {
              return dispatcher(Meow_Req, Meow_Response);
            }
            synReply(Meow_Socket, 407, 'Proxy Authentication required', {'proxy-authenticate': 'basic-realm = "SPDY proxy" '}, function() {
              Meow_Socket.Meow_End();
            });
          });
        } else {
          dispatcher(Meow_Req, Meow_Response);
        }
      }
      Meow_spdyProxy.Meow_Server.Meow_Server.call(Meow_Power, Meow_Opts);
      Meow_Power.Meow_On("connect", Meow_HandleReq);
      Meow_Power.Meow_On("request", Meow_HandleReq);
    };
    Meow_Utils.Meow_Inherits(Meow_spdyProxyServer, Meow_spdyProxy.Meow_Server.Meow_Server);
    var createServer = function(Meow_Opts) {
      return new Meow_spdyProxyServer(Meow_Opts);
    };
    exports.Meow_spdyProxyServer = Meow_spdyProxyServer;
    exports.createServer = createServer;
  });
