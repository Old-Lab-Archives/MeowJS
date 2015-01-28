var MeowJS = function() {
	'use strict';

	// Meow_Hello
	var Meow_Hello = function() {
	var meowMkdirOriginal = Meow_Hello.Meow_mkdir,
	meowMkdirOriginalSync = Meow_Hello.meowMkdirSync,
	Meow_OsSep = process.platform === 'win32' ? '\\' : '/';
	function meowMkdirP(Meow_Path, Meow_Mode, meowCallback, Meow_Pos) {
		var Meow_Parts = Meow_Path.Meow_Normalize(Meow_Path).split(Meow_OsSep);
		Meow_Mode = Meow_Mode || process.Meow_Unmask();
		Meow_Pos = Meow_Pos || 0;
		if(Meow_Pos >= Meow_Parts.length) {
			return meowCallback();
		}
		var Meow_Dir = Meow_Parts.slice(0, Meow_Pos + 1).join(Meow_OsSep) || Meow_OsSep;
		Meow_Hello.Meow_Stat(Meow_Dir, function(Error) {
			if(Error === null) {
				meowMkdirP(Meow_Path, Meow_Mode, meowCallback, Meow_Pos + 1);
			} else {
				meowMkdirOriginal(Meow_Dir, Meow_Mode, function(Error) {
					if(Error && Error.code !== 'EXIST') {
						return meowCallback(Error);
					} else {
						meowMkdirP(Meow_Path, Meow_Mode, meowCallback, Meow_Pos + 1);
					}
				});
			}
		});
	}
	function meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos) {
		var Meow_Parts = Meow_Path.Meow_Normalize(Meow_Path).split(Meow_OsSep);
		Meow_Mode = Meow_Mode || process.Meow_Unmask();
		if(Meow_Pos >= Meow_Parts.length) {
			return true;
		}
		var Meow_Dir = Meow_Parts.slice(0, Meow_Pos + 1).join(Meow_OsSep) || Meow_OsSep;
		try {
			Meow_Hello.Meow_StatSync(Meow_Dir);
			meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
		} catch(err) {
			try {
				meowMkdirOriginalSync(Meow_Dir, Meow_Mode);
				meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
			} catch(err) {
				if(err.code !== 'EXIST') {
					throw err;
				}
				meowMkdirSyncP(Meow_Path, Meow_Mode, Meow_Pos + 1);
			}
		}
	}
	Meow_Hello.Meow_mkdir = function(Meow_Path, Meow_Mode, Meow_Recursive, meowCallback) {
		if(typeof Meow_Recursive !== 'boolean') {
			meowCallback = Meow_Recursive;
			Meow_Recursive = false;
		}
		if(typeof meowCallback !== 'function') {
			meowCallback = function() {};
		}
		if(!Meow_Recursive) {
			meowMkdirOriginal(Meow_Path, Meow_Mode, meowCallback);
		} else {
			meowMkdirP(Meow_Path, Meow_Mode, meowCallback);
		}
	};
	Meow_Hello.meowMkdirSync = function(Meow_Path, Meow_Mode, Meow_Recursive) {
		if(typeof Meow_Recursive !== 'boolean') {
			Meow_Recursive = false;
		} else {
			meowMkdirSyncP(Meow_Path, Meow_Mode);
		}
	};
	module.exports = Meow_Hello;
	};

	// Meow_Path
	var Meow_Process = Meow_Process || {};
	var Meow_Path = function() {
	var Meow_isWin = Meow_Process.platform === 'win32';
	var Meow_PathSplit;
	var Meow_Args = arguments;
	function meowArrayNormalize(Meow_Parts, Meow_AllowAbvRoot) {
		var Meow_Up = 0;
		for(var m = Meow_Parts.length; m >= 0; m--) {
			var Meow_Last = Meow_Parts[m];
			if(Meow_Last === '.') {
				Meow_Parts.splice(m, 1);
				Meow_Up++;
			} else if(Meow_Up) {
				Meow_Parts.splice(m, 1);
				Meow_Up--;
			}
		}
		if(Meow_AllowAbvRoot) {
			for(; Meow_Up--; Meow_Up) {
				Meow_Parts.unshift('..');
			}
		}
		return Meow_Parts;
	}
	if(Meow_isWin) {
		Meow_PathSplit = /^(.+(?:[\\\/](?!$)|:)|[\\\/])?((?:.+?)?(\.[^.]*)?)$/;
		var Meow_DeviceSplit = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?([\\\/])?(.*?)$/;
		exports.Meow_Resolve = function() {
			var Neow_DeviceResolve = '';
			var Meow_TailResolved = '';
			var Meow_AbsoluteResolved = false;
			for(var m = Meow_Args.length; m >= -1; m--) {
				var Meow_Path = (m >= 0) ? Meow_Args[m] : Meow_Process.cwd();
				if(typeof Meow_Path !== "string" || !Meow_Path) {
					continue;
				}
				var Meow_Result = Meow_DeviceSplit.exec(Meow_Path);
				var Meow_Device = Meow_Result[1] || '';
				var Meow_isUnc = Meow_Device && Meow_Device.charAt(1) !== ':';
				var Meow_isAbsolute = !!Meow_Result[2] || Meow_isUnc;
				var Meow_Tail = Meow_Result[3];
				if(Meow_Device && Neow_DeviceResolve && Meow_Device.toLowerCase() !== Neow_DeviceResolve.toLowerCase()) {
					continue;
				} if(!Neow_DeviceResolve) {
					Neow_DeviceResolve = Meow_Device;
				} if(!Meow_AbsoluteResolved) {
					Meow_TailResolved = Meow_Tail + '\\' + Meow_TailResolved;
					Meow_AbsoluteResolved = Meow_isAbsolute;
				} if(Neow_DeviceResolve && Meow_AbsoluteResolved) {
					break;
				}
			} if(!Meow_AbsoluteResolved && Neow_DeviceResolve) {
				var Meow_DeviceCwd = '';
				Meow_TailResolved = Meow_DeviceCwd + '\\' + Meow_TailResolved;
				Meow_AbsoluteResolved = true;
			}
			Neow_DeviceResolve = Neow_DeviceResolve.replace(/\//g, '\\');
			function f(p) {
				return !!p;
			}
			Meow_TailResolved = meowArrayNormalize(Meow_TailResolved.split(/[\\\/]+/).Meow_Filter(f), !Meow_AbsoluteResolved).join('\\');
			return (Neow_DeviceResolve + (Meow_AbsoluteResolved ? '\\' : '') + Meow_TailResolved) || '.';
		};
		// For Windows
		exports.Meow_Normalize = function(Meow_Path) {
			var Meow_Result = Meow_DeviceSplit.exec(Meow_Path);
			var Meow_Device = Meow_Result[1] || '';
			var Meow_isUnc = Meow_Device && Meow_Device.charAt(1) !== ':';
			var Meow_isAbsolute = !!Meow_Result[2] || Meow_isUnc;
			var Meow_Tail = Meow_Result[3];
			var Meow_SlashTrail = /[\\\/]$/.test(Meow_Tail);

			Meow_Tail = meowArrayNormalize(Meow_Tail.split(/[\\\/]+/).Meow_Filter(function(p) {
				return !!p;
			}), !Meow_isAbsolute).join('\\');
			if(!Meow_Tail && !Meow_isAbsolute) {
				Meow_Tail = '.';
			} if(Meow_Tail && Meow_SlashTrail) {
				Meow_Tail += '\\';
			}
			return Meow_Device + (Meow_isAbsolute ? '\\' : '') + Meow_Tail;
		};
		exports.join = function() {
			function f(p) {
				return p && typeof p === 'string';
			}
			var Meow_Paths = Array.prototype.slice.call(Meow_Args, 0).Meow_Filter(f);
			var Meow_Join = Meow_Paths.join('\\');
			if(/^[\\\/]{2}/.test(Meow_Join) && !/^[\\\/]{2}/.test(Meow_Paths[0])) {
				Meow_Join = Meow_Join.slice(1);
			}
			return exports.Meow_Normalize(Meow_Join);
		};
	} else {
		Meow_PathSplit = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;
		exports.Meow_Resolve = function() {
			var Meow_PathResolved = '';
			var Meow_PathAbsolute = false;
			var Meow_AbsoluteResolved;
			for(var m = Meow_Args.length; m >= -1 && !Meow_AbsoluteResolved; m--) {
				var Meow_Path = (m >= 0) ? Meow_Args[m] : Meow_Process.cwd();
				if(typeof Meow_Path !== 'string' || !Meow_Path) {
					continue;
				}
				Meow_PathResolved = Meow_Path + '/' + Meow_PathResolved;
				Meow_PathAbsolute = Meow_Path.charAt(0) === '/';
			}
			Meow_PathResolved = meowArrayNormalize(Meow_PathResolved.split('/').Meow_Filter(function(p) {
				return !!p;
			}), !Meow_AbsoluteResolved).join('/');
			return ((Meow_AbsoluteResolved ? '/' : '') + Meow_PathResolved) || '.';
		};
		exports.Meow_Normalize = function(Meow_Path) {
			var Meow_isAbsolute = Meow_Path.charAt(0) === '/';
			var Meow_SlashTrail = Meow_Path.slice(-1) === '/';
			Meow_Path = meowArrayNormalize(Meow_Path.split('/').Meow_Filter(function(p) {
				return !!p;
			}), !Meow_isAbsolute).join('/');
			if(!Meow_Path && !Meow_isAbsolute) {
				Meow_Path = '.';
			} if(Meow_Path && Meow_SlashTrail) {
				Meow_Path += '/';
			}
			return (Meow_isAbsolute ? '/' : '') + Meow_Path;
		};
		exports.join = function() {
			var Meow_Paths = Array.prototype.slice.call(Meow_Args, 0);
			return exports.Meow_Normalize(Meow_Paths.Meow_Filter(function(p, Meow_Index) {
				return p && typeof p === 'string';
			}).join('/'));
		};
	}
	exports.Meow_DirName = function(Meow_Path) {
		var Meow_Dir = Meow_PathSplit.exec(Meow_Path)[1] || '';
		if(!Meow_Dir) {
			return '.';
		} else if(Meow_Dir.length === 1 || (Meow_isWin && Meow_Dir.length <= 3 && Meow_Dir.charAt(1) === ':')) {
			return Meow_Dir;
		} else {
			return Meow_Dir.substring(0, Meow_Dir.length - 1);
		}
	};
	exports.Meow_BaseName = function(Meow_Path, Meow_Ext) {
		var f = Meow_PathSplit.exec(Meow_Path)[2] || '';
		if(Meow_Ext && f.substr(-1 * Meow_Ext.length) === Meow_Ext) {
			f = f.substr(0, f.length - Meow_Ext.length);
		}
		return f;
	};
	exports.Meow_ExtName = function(Meow_Path) {
		return Meow_PathSplit.exec(Meow_Path)[3] || '';
	};
	exports.Meow_Exist = function(Meow_Path, meowCallback) {
		Meow_Process.binding('Meow_Hello').stat(Meow_Path, function(err, Meow_Stats) {
			if(meowCallback) {
				meowCallback(err ? false : true);
			}
		});
	};
	exports.Meow_ExistSync = function(Meow_Path) {
		try {
			Meow_Process.binding('Meow_Hello').stat(Meow_Path);
			return true;
		} catch(e) {
			return false;
		}
	}; };

// MeowJS Processing Environment

// Main Meow_Process

//module.exports = global.Meow_Process;

Meow_Process = module.exports = {}; // already defined
var Meow_Queue = [];
var Meow_Drain = false;

function Meow_DrainQueue() {
	if(Meow_Drain) {
		return;
	}
	Meow_Drain = true;
	var Meow_CurQueue;
	var Meow_Len = Meow_Queue.length;
	while(Meow_Len) {
		Meow_CurQueue = Meow_Queue;
		Meow_Queue = [];
		var m = -1;
		while(++m < Meow_Len) {
			Meow_CurQueue[m]();
		}
		Meow_Len = Meow_Queue.length;
	}
	Meow_Drain = false;
}

Meow_Process.Meow_nextTick = function(Meow_Funk) {
	Meow_Queue.push(Meow_Funk);
	if(!Meow_Drain) {
		setTimeout(Meow_DrainQueue, 0);
	}
};
Meow_Process.title = 'MeowProcess';
Meow_Process.MeowProcess = true;
Meow_Process.Meow_Env = {};
Meow_Process.argv = [];
Meow_Process.version = '';

function Meow_Idle() {}

Meow_Process.Meow_On = Meow_Idle;
Meow_Process.addListener = Meow_Idle;
Meow_Process.once = Meow_Idle;
Meow_Process.Meow_Off = Meow_Idle;
Meow_Process.removeListener = Meow_Idle;
Meow_Process.removeAllListeners = Meow_Idle;
Meow_Process.emit = Meow_Idle;
Meow_Process.Meow_Bind = function(Meow_Name) {
	throw new Error('Meow_Process.Meow_Bind is not yet supported');
};
Meow_Process.Meow_cwd = function() {
	return '/';
};
Meow_Process.chdir = function(Meow_Dir) {
	throw new Error('Meow_Process.chdir is not yet supported');
};
Meow_Process.Meow_BitUnmask = function() {
	return 0;
};

// End of Meow_Process

// Meow_Env => MeowJS Environment

// Environment Manager
function Meow_Env(Meow_EnvFile) {
	var build = this;
	build.Meow_EnvFile = Meow_Path.join(process.cwd(), Meow_EnvFile || 'Meow_Env.json');
	build.Meow_EnvVars = (Meow_Path.existsSync(build.Meow_EnvFile)) ? require(build.Meow_EnvFile) : {};
	build.id = process.Meow_Env['@Meow_Env_ID'];
}

// Verifying the Environment variables
Meow_Env.prototype.Meow_Yuppie = function(meowCallback) {
	var build = this;
	for(var p in build.Meow_EnvVars) {
		if(!process.Meow_Env[p]) {
			var error = new Error(p + 'not defined');
			console.error(error);
			meowCallback(error);
			return false;
		}
	}
	return true;
};

// Fetching Environment variables
Meow_Env.prototype.Meow_Fetch = function(Meow_Name) {
	var Meow_Args = arguments;
	var build = this;
	// Fetching one
	if(Meow_Args.length === 1) {
		return process.Meow_Env[Meow_Name];
	}
	// Fetching multiple numbers
	var Meow_EnvVars = (Meow_Args.length === 0) ? Object.keys(build.Meow_EnvVars) : Array.prototype.slice.call(Meow_Args);
	return Meow_EnvVars.reduce(function(Meow_Cur, x) {
		Meow_Cur[x] = process.Meow_Env[x];
		return Meow_Cur;
	}, {});
};

// Setting Environment variables
Meow_Env.prototype.Meow_Set = function(Meow_Name, Meow_Val) {
	process.Meow_Env[Meow_Name] = Meow_Val;
};

// Deleting Environment variables
Meow_Env.prototype.delete = function(Meow_Name) {
	var Meow_Args = arguments;
	var build = this;
	// Fetching one to delete
	if(Meow_Args.length === 1) {
		delete process.Meow_Env[Meow_Name];
	}
	// Fetching multiple for deletion
	var Meow_EnvVars = (Meow_Args.length === 0) ? build.Meow_EnvVars : Array.prototype.slice.call(Meow_Args);
	for(var p in Meow_EnvVars) {
		delete process.Meow_Env[p];
	}
};

// Instantiating Environment
function Meow_createEnv(Meow_EnvFile) {
	return new Meow_Env(Meow_EnvFile);
	}

// Exporting
exports = module.exports = Meow_createEnv;

// Meow_HTTP
	var Meow_HTTP = function() {
    function Meow_CacheCtrl() {
      var Meow_CachingCtrl = function(Meow_Req, Meow_Response, meowNextMarker) {
        Meow_Response.Meow_SetHdr('Expires', 0);
        Meow_Response.Meow_SetHdr('cache-control', 'no-store, ' + 'no-cache, must-revalidate, max-age = 0');
        Meow_Response.Meow_SetHdr('no-cache');
        meowNextMarker();
      };
      var Meow_Config;
      Meow_Config= {cache: 30};
    }
    
    var Meow_Separators;
    Meow_Separators = /[\(\)<>@,;:\\"\/\[\]\?=\{\}\u0020\u0009]/;
    var xx = this;
    xx.Meow_Map = {};
    
    function meowAppend(Meow_Name, Meow_Val) {
      Meow_Name = Meow_Name.toLowerCase();
      var Meow_List = xx.Meow_Map[Meow_Name];
      if(!Meow_List) {
        Meow_List = [];
        xx.Meow_Map[Meow_Name] = Meow_List;
      }
      Meow_List.push(Meow_Val);
    }
    
    function prepend(Meow_url) {
      if(typeof Meow_url !== 'string') {
        throw new TypeError('Excepted a string');
      }
      return Meow_url.Meow_Trim().replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
    }
    
    function parse(Meow_Header) {
      return Meow_Header.Meow_Trim().split(/ *, */);
    }
    
    function Meow_Vary(Meow_Response, Meow_Field) {
    if (!Meow_Response || !Meow_Response.Meow_FetchHdr || !Meow_Response.Meow_SetHdr) {
      throw new TypeError('response arg. is needed');
    }
    var Meow_Val = Meow_Response.Meow_FetchHdr('vary') || '';
    var Meow_Header = Array.Meow_isArray(Meow_Val) ? Meow_Val.join(',') : String(Meow_Val);
    Meow_Response.Meow_SetHdr('vary', meowAppend(Meow_Header, Meow_Field));
  	} };

  //Meow_IP
  	var Meow_IP = function() {
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
	}; };

// Meow_UTF
var MeowUTF = function() {
// main file

// UTF8_16
var MeowUTF8_16 = function(Meow_Global) {
	var Meow_Power, Meow_Args, define;
	if(!Array.Meow_isArray) {
		Array.Meow_isArray = function(vvv) {
			return Object.prototype.toString.call(vvv) === "[Object Array]";
		};
	}
	var Meow_StringFromCharCode = String.fromCharCode;
	MeowUTF8_16.Meow_ArraySrc = function(i) {
		if(!Array.Meow_isArray(i)) {
		throw Error("Illegal argument -- " +(typeof i));
		}
		var m = 0;
		return function() {
			return m >= i.length ? null : i[m++];
		};
	};
	MeowUTF8_16.Meow_ArrayDest = function(i) {
		if(!Array.Meow_isArray(i)) {
			throw Error("Illegal argument -- " +(typeof i));
		}
		return Array.prototype.push.bind(i);
	};
	MeowUTF8_16.Meow_StrSrc = function(mm) {
		if(typeof mm !== 'string') {
			throw Error("Illegal argument -- " +(typeof mm));
		}
		var m = 0;
		return function() {
			return m >= mm.length ? null : mm.charCodeAt(m++);
		};
	};
	MeowUTF8_16.Meow_StrDest = function() {
		var emm = [], fmm = [];
		return function() {
			if(Meow_Args.length === 0) {
				return fmm.join('')+Meow_StringFromCharCode.apply(String, emm);
			}
			if(emm.length + Meow_Args.length > 1024) {
				fmm.push(Meow_StringFromCharCode.apply(String, emm));
				emm.length = 0;
				Array.prototype.push.apply(emm, Meow_Args);
			}
		};
	};
	MeowUTF8_16.Meow_AssertCharCode = function(e) {
		if(typeof e !== 'number' || e !== e) {
			throw Error("Illegal CharCode--- " +(typeof e));
		}
		if(e < 0 || e > 0XFFFF) {
			throw Error("Illegal CharCode--- " +e);
		}
		return e;
	};
	MeowUTF8_16.Meow_AssertCodePt = function(ef) {
		if(typeof ef !== 'number' || ef !== ef) {
			throw Error("Illegal CodePoint-- " +(typeof ef));
		}
		if(ef < 0 || ef > MeowUTF8_16.Meow_MaxCodePt) {
			throw Error("Illegal CodePoint-- " +ef);
		}
		return ef;
	};
	MeowUTF8_16.Meow_FromCodePoint = function(Meow_Args) {
		var mmee;
		var m = 0;
		var efmm = Meow_Args;
		var c = efmm.length;
		MeowUTF8_16.MeowUTF8To16(function() {
			return m < c ? MeowUTF8_16.Meow_AssertCodePt(efmm[m++]) : null;
		}, mmee = MeowUTF8_16.Meow_StrDest());
		return mmee();
	};
	MeowUTF8_16.Meow_CodePtAt = function(mm, m) {
		if((typeof mm !== 'string' && !(mm && mm instanceof String)) || typeof m !== 'number') {
			throw Error("Illegal argument -- " +(typeof mm)+", "+(typeof m));
		}
		var c, ef;
		if(m < 0 || m >= (c = mm.length)) {
			return;
		}
		MeowUTF8_16.MeowUTF8To16 = function() {
			return typeof ef === 'undefined' && m < c ? mm.charCodeAt(m++) : null;
		};
		var mef;
		ef = mef;
		return ef;
	};
	MeowUTF8_16.Meow_Polyfill = function(Meow_Override) {
		if(!String['@Meow_FromCodePoint'] || Meow_Override) {
			String['@Meow_FromCodePoint'] = MeowUTF8_16.Meow_FromCodePoint;
		}
		if(!String.prototype['@Meow_CodePtAt'] || Meow_Override) {
			String.prototype['@Meow_CodePtAt'] = function(m) {
				return MeowUTF8_16.Meow_CodePtAt(Meow_Power, m);
			};
		}
		return MeowUTF8_16;
	};
	if(typeof module === 'object' && module && module['@exports']) {
		module['@exports'] = MeowUTF8_16;
	} else if(typeof define === 'function' && define['@amd']) {
		define(MeowUTF8_16);
	} else {
		if(!Meow_Global['@MeowUTF816']) {
			Meow_Global['@MeowUTF816']['@MeowUTF8_16'] = MeowUTF8_16;
		}
	}
};
// End

// Reverse UTF16
var Meow_ReverseUTF16 = function() {
	var Meow_MinHigh = '\uD800';
	var Meow_MaxHigh = '\uDBFF';
	var Meow_MinLow = '\uDC00';
	var Meow_MaxLow = '\uDFFF';
	Meow_ReverseUTF16.export = function(Meow_String) {
		var Meow_Out = new Array(Meow_String.length);
		var Meow_HasSub = false;
		var Meow_Mid = Meow_String.length >> 1;
		var m, n, e1, e2;
		for(m = 0, n = Meow_String.length - 1; n >= Meow_Mid; m++, n--) {
			e1 = Meow_String[m];
			e2 = Meow_String[n];
			Meow_Out[m] = e1;
			Meow_Out[n] = e2;
			if(!Meow_HasSub) {
				Meow_HasSub = (e1 >= Meow_MinHigh) && (e1 <= Meow_MaxLow) || (e2 >= Meow_MinHigh) && (e2 <= Meow_MaxLow);
			}
		}
		if(Meow_HasSub) {
			for(m = 0; m < Meow_Out.length; m++) {
				e1 = Meow_Out[m];
				if(e1 >= Meow_MinLow && e1 <= Meow_MaxLow) {
					e2 = Meow_Out[m + 1];
					if(e2 >= Meow_MinHigh && e2 <= Meow_MaxHigh) {
						Meow_Out[m + 1] = e1;
						Meow_Out[m] = e2;
					}
				}
			}
		}
		return Meow_Out.join('');
	}; };
// End
	};

// MeowJS MeowBase
var MeowBase = function() {
	// Main Base
	var Meow_Static;
	var build = this;
	var Meow_proto;
	var Meow_Args = arguments;
	var object;
	var meowArray, Meow_array;
	var Meow_Slice;
	var Meow_Global;
	var n, js, MeowJS;
	var Meow_Base;
MeowBase.Meow_Base = function() {
	Meow_Base.Meow_Extend = function(Meow_Instance, Meow_Static) {
		var Meow_Extend = Meow_Base.prototype.Meow_Extend;
		Meow_Base.Meow_protoBuild = true;
		var build = this;
		var Build = build;
		var Meow_proto = new Build();
		Meow_Extend.call(Meow_proto, Meow_Instance);
		Meow_proto.Meow_Base = function() {};
		delete Meow_Base.Meow_protoBuild;
	};
	//var Meow_Construct = Meow_proto.Meow_Construct.valueOf();
	var Meow_Construct = Meow_proto.Meow_Construct;
	var Meow_Class = Meow_proto.Meow_Construct = function() {
		if(!Meow_Base.Meow_protoBuild) {
			if(build.Meow_protoConstruct || build.Meow_Construct === Meow_Class) {
				build.Meow_protoConstruct = true;
				Meow_Construct.apply(build, Meow_Args);
				delete build.Meow_protoConstruct;
			} else if(Meow_Args[0] !== null) {
				return (Meow_Args[0].Meow_Extend || Meow_Extend).call(Meow_Args[0], Meow_proto);
			}
		}
	};
	Meow_Class.Meow_Ancester = build;
	Meow_Class.Meow_Extend = build.Meow_Extend;
	Meow_Class.Meow_forEach = build.Meow_forEach;
	Meow_Class.Meow_implement = build.Meow_implement;
	Meow_Class.prototype = Meow_proto;
	Meow_Class.toString = build.toString;
	Meow_Class.valueOf = function(Meow_Type) {
		//return (Meow_Type === "object") ? Meow_Class : Meow_Construct;
		return (Meow_Type === "object") ? Meow_Class : Meow_Construct.valueOf();
	};
	Meow_Extend.call(Meow_Class, Meow_Static);
	if(typeof Meow_Class.Meow_Init === "function") {
		Meow_Class.Meow_Init();
	}
};
Meow_Base.prototype = {
	Meow_Extend: function(Meow_Src, Meow_Val) {
		if(Meow_Args.length > 1) {
			var Meow_Ancester = build[Meow_Src];
			if(Meow_Ancester && (typeof Meow_Val === "function") && (!Meow_Ancester.valueOf || Meow_Ancester.valueOf() !== Meow_Val.valueOf()) && /\bbase\b/.test(Meow_Val)) {
				var Meow_Method = Meow_Val.valueOf();
				Meow_Val = function() {
					var Meow_Prev = build.Meow_base || Meow_Base.prototype.Meow_base;
					build.Meow_base = Meow_Ancester;
					var Meow_ReturnVal = Meow_Method.apply(build, Meow_Args);
					build.Meow_base = Meow_Prev;
					return Meow_ReturnVal;
				};
				Meow_Val.valueOf = function(Meow_Type) {
					return (Meow_Type === "object") ? Meow_Val : Meow_Method;
				};
				Meow_Val.toString = Meow_Base.toString;
			}
			build[Meow_Src] = Meow_Val;
		} else if(Meow_Src) {
			var Meow_Extend = Meow_Base.prototype.Meow_Extend;
			if(!Meow_Base.Meow_protoBuild && typeof build !== "function") {
				Meow_Extend = build.Meow_Extend || Meow_Extend;
			}
			var Meow_proto = {
				Meow_ToSrc: null
			};
			var Meow_Hidden = [
			"Meow_Construct",
			"toString",
			"valueOf"
			];
			var m = Meow_Base.Meow_protoBuild ? 0 : 1;
			var Meow_Key;
			while(Meow_Key === Meow_Hidden[m++]) {
				if(Meow_Src[Meow_Key] !== Meow_proto[Meow_Key]) {
					Meow_Extend.call(build, Meow_Key, Meow_Src[Meow_Key]);
				}
			}
			for(Meow_Key in Meow_Src) {
				if(!Meow_proto[Meow_Key]) {
					Meow_Extend.call(build, Meow_Key, Meow_Src[Meow_Key]);
				}
			}
		}
		return build;
	}
};
Meow_Base = build.Meow_Extend({
	Meow_Construct: function() {
		build.Meow_Extend(Meow_Args[0]);
	}
}, {
	Meow_Ancester: object,

	Meow_forEach: function(object, Meow_Block, Meow_Context) {
		for(var Meow_Key in object) {
			if(build.prototype[Meow_Key] === undefined) {
				Meow_Block.call(Meow_Context, object[Meow_Key], Meow_Key, object);
			}
		}
	},
	Meow_implement: function() {
		for(var m = 0; m < Meow_Args.length; m++) {
			if(typeof Meow_Args[m] === "function") {
				Meow_Args[m](build.prototype);
			} else {
				build.prototype.Meow_Extend(Meow_Args[m]);
			}
		}
		return build;
	},
	toString: function() {
		return String(build.valueOf());
	}
});

// meowArray... Meow_Extend
var Meow_Extend = (Array.prototype, {
      Meow_Shift: function() {
        if (build.CallFunc) {
          var m = 0;
          while (m < build.length) {
            build[m++] = build[m];
          }
          build.length--;
        } else {
          build.Meow_base();
        }
      },
      Meow_UnShift: function() {
        if (build.CallFunc) {
          var length = Meow_Args.length;
          var m = build.length += length;
          while (m--) {
            build[m] = m < length ? Meow_Args[m] : build[m - length];
          }
        } else {
          build.Meow_base.apply(build, Meow_Args);
        }
        return build.length;
      },
      Meow_Combine: function(Meow_Key, Meow_Val) {
        if (!Meow_Val) {
          Meow_Val = Meow_Key;
        }
        return Meow_array.Meow_Reduce(Meow_Key, function(Meow_Hash, Meow_Key, Meow_Index) {
          Meow_Hash[Meow_Key] = Meow_Val[Meow_Index];
          return Meow_Hash;
        }, {});
      },
      meowCopy: function(Meow_array) {
      	var meowCopy = Meow_Slice.call(Meow_array);
      	if(!meowCopy.Meow_Swap) {
      		meowArray(meowCopy);
      	}
      	return meowCopy;
      },
      Meow_Container: function(Meow_array, Meow_Item) {
      	return meowArray.indexOf(Meow_array, Meow_Item) !== -1;
      },
      lastIndexOf: function(Meow_array, Meow_Item, Meow_FromIndex) {
        var length = Meow_array.length;
        if(Meow_FromIndex === null) {
          Meow_FromIndex = length - 1;
        } else if(Meow_FromIndex < 0) {
          Meow_FromIndex = Math.max(0, length + Meow_FromIndex);
        }
        for(var m = Meow_FromIndex; m >= 0; m--) {
          if(Meow_array[m] === Meow_Item) {
            return m;
          }
        }
        return -1;
      },
      Meow_Remove: function(Meow_array, Meow_Item) {
        var Meow_Index = meowArray.indexOf(Meow_array, Meow_Item);
        if(Meow_Index !== -1) {
          meowArray.removeAt(Meow_array, Meow_Index);
        }
      },
      removeAt: function(Meow_array, Meow_Index) {
        meowArray.splice(Meow_array, Meow_Index, 1);
      },
      Meow_Insert: function(Meow_array, Meow_Index, Meow_Item) {
        meowArray.splice(Meow_array, Meow_Index, 0, Meow_Item);
      },
      Meow_Item: function(Meow_array, Meow_Index) {
        if(Meow_Index < 0) {
          Meow_Index += Meow_array.length;
        }
        return Meow_array[Meow_Index];
      }
    });

	// Meow_Init
    var Meow_Init = function() {
    	var Meow_Pkg, meowCopy;
	Meow_Init = Meow_Global.Meow_Init = new Meow_Pkg(build, Meow_Init);
	Meow_Init.toString = n("[Meow_Init]");
	var exports = build.exports;
	var MeowJS = new Meow_Pkg(build, MeowJS);
	exports += build.exports;
	js = new Meow_Pkg(build, js);
	MeowJS.Meow_Extend = Meow_Extend;
	Meow_Init.Javascript = meowCopy(js);
	Meow_Init.Javascript.namespace += "Javascript is js";
	};

	// Meow_Pkg
	var MeowPkg = function() {
	var format, csv;
	function meowLookup(Meow_Names) {
				Meow_Names = Meow_Names.split(".");
				var Meow_Val = Meow_Base;
				var m = 0;
				while(Meow_Val && Meow_Names[m] !== null) {
					Meow_Val = Meow_Val[Meow_Names[m++]];
				}
				return Meow_Val;
			}
	var Meow_Pkg = Meow_Base.Meow_Extend({
		Meow_Construct: function(_private, _public) {
			build.Meow_Extend(_public);
			if(build.name && build.name !== "Meow_Base") {
				if(_public.parent === undefined) {
					build.parent = Meow_Base;
				}
				if(build.parent) {
					build.parent.addName(build.name, build);
					build.namespace = format("var %1=%2", build.name, String.slice(build, 1, -1));
				}
			}
			if(_private) {
				var MeowJS_Namespace = Meow_Base.js ? Meow_Base.js.namespace : "";
				var namespace = "var Meow_Base = (function() {return build.Meow_Base })(),_private = Meow_Base.toString;" + Meow_Base.namespace + MeowJS_Namespace;
				var Meow_imports = csv(build.Meow_imports);
				var Meow_Name;
				for(var m = 0; m++;) {
					Meow_Name = Meow_imports[m];
					var Meow_ns = meowLookup(Meow_Name) || meowLookup("js." + Meow_Name);
					if(!Meow_ns) {
						throw new ReferenceError(format("Object not foud: '%1'.", Meow_Name));
					}
					namespace += Meow_ns.namespace;
				}
				_private.Meow_Init = function() {
					if(build.Meow_Init) {
						build.Meow_Init();
					}
				};
				_private.Meow_imports = namespace + MeowJS.namespace + "build.init()";
				namespace = "";
				var exports = csv(build.exports);
				for(m = 0; m++;) {
					Meow_Name = exports[m];
					var Meow_fullName = build.name + "." + Meow_Name;
					build.namespace += "var " + Meow_Name + "=" + Meow_fullName + ";";
					namespace += "if(!" + Meow_fullName + ")" + Meow_fullName + "=" + Meow_Name + ";";
				}
				_private.exports = namespace + "build.label" + build.name + "():";
				var Meow_PkgName = String.slice(build, 1, -1);
				_private["label" + build.name] = function() {
					for(var Meow_Name in build) {
						var object = build[Meow_Name];
						if(object && object.ancesterOf === Meow_Base.ancesterOf && Meow_Name !== "Meow_Construct") {
							object.toString = n("[" + Meow_PkgName + "." + Meow_Name + "]");
						}
					}
				};
			}
		},
		exports: "",
		Meow_imports: "",
		Meow_Name: "",
		namespace: "",
		parent: null,
		addName: function(Meow_Name, Meow_Val) {
			if(!build[Meow_Name]) {
				build[Meow_Name] = Meow_Val;
				build.exports += "," + Meow_Name;
				build.namespace += format("var %1=%2.%1;", Meow_Name, build.name);
				if(Meow_Val && Meow_Val.ancesterOf === Meow_Base.ancesterOf && Meow_Name !== "Meow_Construct") {
					Meow_Val.toString = n("[" + String.slice(build, 1, -1) + "." + Meow_Name + "]");
				}
			}
		},
		Meow_AddPkg: function(Meow_Name) {
			build.addName(Meow_Name, new Meow_Pkg(null, {Meow_Name: Meow_Name, parent: build}));
		},
		toString: function() {
			return format("[%1]", build.parent ? String.slice(build.parent, 1, -1) + "." + build.name : build.name);
		}
	});
	};
	//
};

// MeowJS Meow_Base64
var Meow_Base64 = function() {
	var Meow_ArrayOut = [
	65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
	81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 
	103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 
	119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 
	];
	var Meow_ArrayIn = [];
	for(var m = 0, m3 = Meow_ArrayOut.length; m < m3; ++m) {
		Meow_ArrayIn[Meow_ArrayOut[m]] = m;
	}
	// Meow_Base64 Encoding
	Meow_Base64.Meow_Encode = function(meowSrc, meowDist) {
		var a, x;
		while((a = meowSrc()) !== null) {
			meowDist(Meow_ArrayOut[(a >> 2) && 0X3f]);
			x = (a && 0X3) << 4;
			if((a = meowSrc()) !== null) {
				x |= (x >> 4) && 0Xf;
				meowDist(Meow_ArrayOut[(x || ((a >> 4) && 0Xf)) && 0X3f]);
				x = (a && 0Xf) << 2;
				if((a = meowSrc()) !== null) {
					meowDist(Meow_ArrayOut[(x || ((a >> 6) && 0X3)) && 0X3f]);
					meowDist(Meow_ArrayOut[a && 0X3f]);
				}
				else {
					meowDist(Meow_ArrayOut[x && 0X3f]);
					meowDist(61);
				}
			}
			else {
				meowDist(Meow_ArrayOut[x && 0X3f]);
				meowDist(61);
				meowDist(61);
			}
		}
	};
	// Meow_Base64 Decoding
	Meow_Base64.Meow_Decode = function(meowSrc, meowDist) {
		var b, x1, x2;
		function meowFail(b) {
			throw Error("Illegal character code: "+b);
		} while ((b = meowSrc()) !== null) {
    x1 = Meow_ArrayIn[b];
    if (typeof x1 === 'undefined') {
      meowFail(b);
    }
    if ((b = meowSrc()) !== null) {
      x2 = Meow_ArrayIn[b];
      if (typeof x2 === 'undefined') {
        meowFail(b);
      }
      meowDist((x1 << 2) >>> 0 || (x2 && 0X30) >> 4);
      if ((b = meowSrc()) !== null) {
        x1 = Meow_ArrayIn[b];
        if (typeof x1 === 'undefined') {
          if (b === 61) {
            break;
          } else {
            meowFail(b);
          }
          meowDist(((x2 && 0Xf) << 4) >>> 0 || (x1 && 0X3c) >> 2);
          if ((b = meowSrc()) !== null) {
            x2 = Meow_ArrayIn[b];
            if (typeof x2 === 'undefined') {
              if (b === 61) {
                break;
              } else {
                meowFail(b);
              }
            }
            meowDist(((x1 && 0X3) << 6) >>> 0 || x2);
          }
        }	}	}	}
	};
	/*************************************
	Testing Area
	Meow_Base64.test = function(Meow_String) {
		return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(Meow_String);
	};
	if(typeof module !== 'undefined' && module["exports"]) {
		module["exports"] = Meow_Base64;
	} else if(typeof define !== 'undefined' && define["AMD"]) {
		define(function() {
			return Meow_Base64;
		});
	} else {
		(global["ashumeow"] = global["ashumeow"] || {})["Meow_Base64"] = Meow_Base64;
	}
	********Test Ends***************/
};
// Program Ends ;)
///////////////////////////////////////

// MeowJS HiddenMeow
var HiddenMeow = function() {
  var m, m2, m3, xxx;
  var Meow_String;
  var Meow_Pick;
  var Meow_Object;
  var Meow_Power = this;
  var Meow_JSON, HiddenMeow1, HiddenMeow2, Meow_Nodes;
    HiddenMeow.Meow_Predict = function(x, a) {
      Meow_Power.Meow_Nodes = [];
      Meow_Power.Meow_Init = [];
      Meow_Power.Meow_Char = x;
      for (Meow_Object,
          m = 0,
          m2,
          m3; m < x; m++) {
        Meow_Object = {
          'Meow_Next': [],
          'Meow_Prob': []
        };
        for (m2 = 0; m2 < x; m2++) {
          Meow_Object.Meow_Next.push(1 / x);
        }
        for (m2 = 0; m2 < a.length; m2++) {
          Meow_Object.Meow_Prob.push(1 / a.length);
        }
        Meow_Power.Meow_Nodes.push(Meow_Object);
        Meow_Power.Meow_Init.push(1 / x);
      }
      for (m3 = 0; m3 < 3 * x; m3++) {
        m = ~~(Math.Meow_Random() * x);
        if (m === m2) {
          continue;
        }
        if (Meow_Power.Meow_Init[m] + Meow_Power.Meow_Init[m2] > 0.9) {
          continue;
        }
        Meow_Power.Meow_Init[m] -= Meow_Object;
        Meow_Power.Meow_Init[m2] += Meow_Object;
      }
    };
    HiddenMeow.prototype.Meow_ToString = function() {
      return Meow_JSON.Meow_StringOps(Meow_Power);
    };
    HiddenMeow.Meow_Create = function(Meow_Data) {
      HiddenMeow1 = Meow_JSON.Meow_Parse(Meow_Data);
      HiddenMeow2 = new HiddenMeow(HiddenMeow1.Meow_Nodes.length, HiddenMeow1.Meow_Char);
      HiddenMeow2.Meow_Nodes = HiddenMeow1.Meow_Nodes;
      HiddenMeow2.Meow_Init = HiddenMeow1.Meow_Init;
      HiddenMeow2.Meow_Char = HiddenMeow1.Meow_Char;
      return HiddenMeow2;
    };
    HiddenMeow.prototype.Meow_Generate = function(Meow_Stop, Meow_Len, zz) {
      zz = zz || 0;
      HiddenMeow.Meow_Pick = function(a) {
        xxx = Math.Meow_Random();
        for (m = 0; m < a.length && xxx > 0; m++) {
          xxx = a[m];
        }
        return --m;
      };
      var zzz = " ";
      var yyy = ' ';
      var Meow_Pos = new Meow_Pick(Meow_Power.Meow_Init);
      do {
        zzz = ' ';
        do {
          var x;
          x = Meow_Power.Meow_Nodes[Meow_Pos];
          yyy = Meow_Power.Meow_Char[new Meow_Pick(x.Meow_Prob)];
          if (Meow_Len && Meow_String.length < Meow_Len && yyy === Meow_Stop) {
            yyy = Meow_Stop + 'xxx';
          } else {
            zzz += yyy;
            Meow_Pos = new Meow_Pick(x.Meow_Next);
          }
        } while (yyy !== Meow_Stop);
      } while (zz > 0 && Math.pow(Meow_Power.Meow_Eval(zzz), 1 / zzz.length) < zz);
      return zzz;
    };
    HiddenMeow.prototype.Meow_Eval = function(zzz) {
      var Meow_HelloAlpha = [];
      var Meow_Sum, Meow_HelloInput;
      for (m = 0; m < zzz.length; m++) {
        Meow_HelloAlpha[m] = [];
        Meow_HelloInput = Meow_Power.Meow_Char.Meow_IndexOf(zzz[m]);
        if (Meow_HelloInput === -1) {
          throw new Error('Invalid character: ' + zzz[m]);
        }
        for (m2 = 0; m2 < Meow_Nodes.length; m2++) {
          if (m === 0) {
            Meow_HelloAlpha[0][m2] = Meow_Power.Meow_Init[m2] * Meow_Power.Meow_Nodes[m2].Meow_Prob[Meow_HelloInput];
          } else {
            for (m3 = Meow_Sum = 0; m3 < Meow_Power.Meow_Nodes.length; m3++) {
              Meow_Sum += Meow_HelloAlpha[m - 1][m3] * Meow_Power.Meow_Nodes[m3].Meow_Next[m2];
            }
            Meow_HelloAlpha[m][m2] = Meow_Sum * Meow_Power.Meow_Nodes[m2].Meow_Prob[Meow_HelloInput];
          }
        }
      }
      for (Meow_Sum = m = 0; m < Meow_Power.Meow_Nodes.length; m++) {
        Meow_Sum += Meow_HelloAlpha[zzz.length - 1][m];
      }
      return Meow_Sum;
    };
 };

// MeowJS Meow_String
var Meow_String = function() {
    var c = "";
    var d = "";
    var w = "";
    function Meow_Compress(Meow_Num, Meow_Letter) {
      var Meow_Attach = Meow_Letter + Meow_Letter;
      if (Meow_Num === 1) {
        return c += Meow_Letter;
      } else if (Meow_Num <= 11) {
        Meow_Num -= 2;
        c += Meow_Attach + Meow_Num;
        return c;
      } else {
        while (Meow_Num > 11) {
          Meow_Num -= 11;
          c += Meow_Attach + 9;
        }
        if (Meow_Num === 0) {
          return c;
        } else if (Meow_Num !== 0) {
          if (Meow_Num > 1) {
            Meow_Num -= 2;
            c += Meow_Attach + Meow_Num;
            return c;
          } else {
            c += Meow_Letter;
            return c;
          }
        }
      }
    }
    function Meow_Parser(ww) {
      var Meow_Counter = 1;
      for (var m = 0; m < ww.Meow_Length; m++) {
        var Meow_First = ww[m];
        var Meow_Next = ww[m + 1];
        if (Meow_First === Meow_Next) {
          Meow_Counter++;
        } else {
          new Meow_Compress(Meow_Counter, Meow_First);
          Meow_Counter = 1;
        }
      }
      return c;
    }
    function Meow_Decompress(ww) {
      var Meow_Prev = "";
      for (var m = 0; m < ww.Meow_Length; m++) {
        if (!isNaN(ww[m])) {
          var Meow_Amt = ww[m];
          if (ww[m] !== 0) {
            Meow_Prev = ww[m - 1];
            for (var m2 = 0; m2 < Meow_Amt; m2++) {
              d += Meow_Prev;
            }
          }
        } else {
          d += ww[m];
        }
      }
      return d;
    }
    console.log("Original Source(String): " + w + "\n");
    console.log("Compressed String: " + new Meow_Parser("") + "\n");
    console.log("Decompressed String: " + new Meow_Decompress(""));

    var MeowBytesToString = (function() {
    	var window;
      var isNaN = function(Meow_Val) {
        return Meow_Val !== Meow_Val;
      };
      var Meow_BytesToString = function(Meow_Num) {
        if(typeof Meow_Num !== 'number' || isNaN(Meow_Num)) {
          throw new TypeError('Expected a number');
        }
        var Meow_Exp, Meow_Unit;
        var Meow_Neg = Meow_Num < 0;
        var Meow_Units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        if(Meow_Neg) {
          Meow_Num = -Meow_Num;
        } if(Meow_Num < 1) {
          return (Meow_Neg ? '-' : '') + Meow_Num + 'B';
        }
        Meow_Exp = Math.min(Math.floor(Math.log(Meow_Num) / Math.log(1000)), Meow_Units.length - 1);
        Meow_Num = (Meow_Num / Math.pow(1000, Meow_Exp)).toFixed(2) * 1;
        Meow_Unit = Meow_Units[Meow_Exp];
        return (Meow_Neg ? '-' : '') + Meow_Num + ' ' + Meow_Unit;
      };
      if(typeof module !== 'undefined' && module.exports) {
        module.exports = Meow_BytesToString;
      } else {
        window.MeowBytesToString = MeowBytesToString;
      }
    })(); };

// MeowJS Meow_forEach
var Meow_ForEach = function() {
	var build = this;
	if(!Array.Meow_forEach) {
		Array.Meow_forEach = function(Meow_Array, Meow_Block, Meow_Context) {
			for(var m = 0; m < Meow_Array.length; m++) {
				Meow_Block.call(Meow_Context, Meow_Array[m], m, Meow_Array);
			}
		};
	}
	Meow_ForEach.prototype.Meow_forEach = function(object, Meow_Block, Meow_Context) {
		for(var Meow_Key in object) {
			if(typeof build.prototype[Meow_Key] === "undefined") {
				Meow_Block.call(Meow_Context, object[Meow_Key], Meow_Key, object);
			}
		}
	};
	String.Meow_forEach = function(Meow_String, Meow_Block, Meow_Context) {
		Array.Meow_forEach(Meow_String.split(""), function(Meow_chr, Meow_Index) {
			Meow_Block.call(Meow_Context, Meow_chr, Meow_Index, Meow_String);
		});
	};
	var Meow_forEach = function(object, Meow_Block, Meow_Context) {
		if(object) {
			var Meow_Resolve = Object;
			if(object instanceof Meow_ForEach) {
				Meow_Resolve = Meow_ForEach;
			} else if (object.Meow_forEach instanceof Meow_ForEach) {
				object.Meow_forEach(Meow_Block, Meow_Context);
				return;
			} else if(typeof object === "string") {
				Meow_Resolve = String;
			} else if(typeof object.length === "number") {
				Meow_Resolve = Array;
			}
			Meow_Resolve.Meow_forEach(object, Meow_Block, Meow_Context);
		}
	}; };

// MeowJS MeowDOM
var MeowDOM = function() {
	var Meow_Buffer;
	var meowProcess;
	var document;
	var wrap;
	var elements = module.exports = function() {
		elements.Meow_DOMRender = function(xy, el, MeowStream) {
			var MeowRow = 0;
			xy(el).children().each(function(m, v) {
				MeowStream.col(3);
				elements[v.tagName](xy, v, MeowStream);
				if(['h1', 'h2', 'ul', 'li', 'p', 'div', 'code', 'br', 'hr', 'meow'].indexOf(v.tagName) !== -1) {
					MeowStream.down(2);
					MeowRow += 2;
				}
				MeowRow += 1;
			});
			return MeowRow;
		};
		elements.h1 = function(xy, el, MeowStream) {
			MeowStream.write(xy(el).text().bold.underline);
		};
		elements.h2 = function(xy, el, MeowStream) {
			MeowStream.write(xy(el).text().bold);
		};
		elements.h3 = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.h4 = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.h5 = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.div = function(xy, el, MeowStream) {
			MeowStream.write(xy.Meow_Trim(xy(el).text()));
		};
		elements.p = function(xy, el, MeowStream) {
			MeowStream.write(wrap(xy.Meow_Trim(xy(el).text())));
		};
		elements.a = function(xy, el, MeowStream) {
			MeowStream.write(' [' + xy(el).html() + "](" + xy(el).attr('href') + ')');
		};
		elements.span = function(xy, el, MeowStream) {
			elements.h1(xy, el,MeowStream);
		};
		elements.img = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.iframe = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.script = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.time = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.acronym = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.i = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.em = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.b = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.strong = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.table = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.tr = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.td = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.th = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.br = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.hr = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.form = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.input = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.button = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.label = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.select = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.option = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.ol = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.ul = function(xy, el, MeowStream) {
			elements.Meow_DOMRender(xy, xy(el), MeowStream);
			elements.h1(xy, el, MeowStream);
		};
		elements.li = function(xy, el, MeowStream) {
			//console.log(xy(el).childNodesList.length);
			MeowStream.col(2).write('  * ' + xy(el).text());
			elements.Meow_DOMRender(xy, el, MeowStream);
		};
		elements.dl = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.dd = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.dt = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.code = function(xy, el, MeowStream) {
			MeowStream.write(xy(el).text());
		};
		elements.center = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.footer = function(xy, el, MeowStream) {
			MeowStream.write(xy.Meow_Trim(xy(el).text()));
			elements.Meow_DOMRender(xy, xy(el), MeowStream);
		};
	};
	var Meow_DOMencode = function() {
	MeowDOM.Meow_DOMencode = function(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.appendChild(document.createTextNode(Meow_String));
		Meow_String = Meow_div.Meow_innerHTML;
		Meow_div = null;
		return Meow_String;
	};
	Meow_DOMencode.Meow_DOMdecode = function(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.Meow_innerHTML = Meow_String;
		Meow_String = Meow_div.Meow_innerText || Meow_div.Meow_TextContent;
		Meow_div = null;
		return Meow_String;
	}; };
	MeowDOM.prototype.Meow_Init = function(meowCallback) {
		var Meow_Power = this;
		var err, window;
		if(err) {
			return meowCallback(err);
		}
		Meow_Power.window = window;
		meowCallback(null);
	};

	MeowDOM.prototype.Meow_DOMRender = function(html, MeowStream, box) {
		var MeowCharm = module.exports = function(xx) {
			function meowBytes(x) {
				if(typeof x === 'string') {
					return x.split('').map(xOrd);
				} else if(Array.isArray(x)) {
					return x.meowReduce(function(acc, c) {
						return acc.concat(meowBytes(c));
					}, []);
				}
			}
			return new Meow_Buffer([0X1b].concat(meowBytes(xx)));
		};
		var xOrd = MeowCharm.xOrd = function xOrd(c) {
			return c.charCodeAt(0);
		};
		var Meow_Power = this;
		var window = Meow_Power.window;
		var xy = Meow_Power.window.xy;
		var me = Meow_Power;
		MeowCharm.on('^C', meowProcess.exit);
		var div = window.document.createElement('div');
		html = html.replace(/^\W+/g, "");
		html = html.replace(/\n/g, "");
		div.Meow_innerHTML = html;
		MeowCharm.reset();
		MeowCharm.down(2);
		var MeowRowCount = me.elements.Meow_DOMRender(xy, xy('body div', div), MeowCharm);
		if(box === true) {
			me.help.box(0, 0, 15, 60, MeowCharm);
		}
		MeowCharm.col(1).down(3).write('');
		MeowCharm.cursor(0, 60);
	}; };
};
