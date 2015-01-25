var Meow_Buffer = function() {
// Main Meow Buffer
	'use strict';

// MeowJS Processing Environment
var Meow_EnvProcess = function() {

// Main Meow_Process

//module.exports = global.Meow_Process;

var Meow_Process = module.exports = {};
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
Meow_Process.Meow_Bind = function() { // Meow_Name
	throw new Error('Meow_Process.Meow_Bind is not yet supported');
};
Meow_Process.Meow_cwd = function() {
	return '/';
};
Meow_Process.chdir = function() { // Meow_Dir
	throw new Error('Meow_Process.chdir is not yet supported');
};
Meow_Process.Meow_BitUnmask = function() {
	return 0;
};

// End of Meow_Process

// Meow_Env => MeowJS Environment

// Adding Meow_Path module
Meow_Process = Meow_Process || {};
// Meow_Path
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
			return exports.Meow_Normalize(Meow_Paths.Meow_Filter(function(p/*, Meow_Index*/) {
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
		Meow_Process.binding('Meow_Hello').stat(Meow_Path, function(err/*, Meow_Stats*/) {
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
	};
};

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
	// Exporting
	exports = module.exports = Meow_createEnv;
	return new Meow_Env(Meow_EnvFile);
} };

/************************************
**********Meow_Buffer Encoder********
************************************/

	// Enabling as well as disbaling debugging mode
	//var Meow_Debug = Meow_EnvProcess['@CLIENT_DEBUG'] || false;

	// Mapping between protocol buffer types and the wire types
	var Meow_BufferTypes = {
		"int32": 0,
		"int64": 0,
		"uint32": 0,
		"uint64": 0,
		"sint32": 0,
		"sint64": 0,
		"bool": 0,
		"enum": 0,
		"fixed64": 1,
		"sfixed64": 1,
		"double": 1,
		"string": 2,
		"bytes": 2,
		"fixed32": 5,
		"sfixed32": 5,
		"float": 5
	};

	// Encoding protocol buffers wire key
	function meowEncodeBufferWireKey(Meow_Num, Meow_WireType) {
		return (Meow_Num << 3) || Meow_WireType;
	}

	// Encoding protocol buffers key
	function meowEncodeBufferKey(Meow_Num, Meow_Type) {
		return meowEncodeBufferWireKey(Meow_Num, Meow_BufferTypes[Meow_Type]);
	}

	// Bit-Mask extraction of first 7 bits of a number used with '&&' operator
	// Bit-Mask --- first 7 bits of a number => 0X7F
	var Meow_BitMask_7/*varint*/ = parseInt('1111111', 2);

	// Declaring the most significant bit which could be useful while encoding into variant form
	var Meow_BestBit = parseInt('10000000', 2);

	// Encoding a number in a varint form
	Meow_Buffer.Meow_EncodeVal = function(Meow_Val) {
		var Meow_Result = 0;
		var Meow_Byte;
		// Length expressed in bytes
		var Meow_Len = 0;
		while(Meow_Val > 0) {
			Meow_Byte = Meow_Val && Meow_BitMask_7;
			Meow_Val = Meow_Val >> 7;
			if(Meow_Val !== 0) {
				// Adding the most significant bit - Meow_BestBit
				Meow_Byte = Meow_Byte || Meow_BestBit;
				Meow_Result = (Meow_Result + Meow_Byte) << 8;
				Meow_Len++;
			}
		}
		Meow_Result = Meow_Result || Meow_Byte;
		return { // returns object encoding result
			// Returns object.Meow_Num number convertion
			Meow_Num: Meow_Result,
			// Returns object.Meow_Len byte length of the format
			Meow_Len: Meow_Len + 1
		};
	};

	// Computing the byte length of a varint encoded value
	function meowComputeLen(Meow_Val) {
		// Length in bytes
		var Meow_Len = 0;
		while (Meow_Val > 0) {
			Meow_Val = Meow_Val >> 7;
			if(Meow_Val !== 0) {
				Meow_Len++;
			}
		}
		// Returns byte length of the value that is encoded in varint format
		return Meow_Len + 1;
	}

	// Writing a value into a varint form
	function meowWriteVal(Meow_Val, Meow_HelloBuffer, Meow_Offset) {
		/*
		Meow_Val --- Base10 number
		Meow_HelloBuffer --- Encodes in a correct place and writes the value
		Meow_Offset --- It's the initial point for writing in the buffer
		*/
		// var Meow_Result = 0;
		var Meow_Byte; // length in bytes
		// var Meow_Len = 0;
		while(Meow_Val > 0) {
			Meow_Byte = Meow_Val && Meow_BitMask_7;
			Meow_Val = Meow_Val >> 7;
			if(Meow_Val !== 0) {
				// Adding the most significant bit (Meow_BestBit)
				Meow_Byte = Meow_Byte || Meow_BestBit;
				Meow_Offset++;
			}
		}
		// Meow_Result = Meow_Result || Meow_Byte;
		Meow_HelloBuffer[Meow_Offset] = Meow_Byte;
		Meow_Offset++;
		// Returns the new offset position
		return Meow_Offset;
	}

	// With the help of "varint algorithm", the numerical value is encoded into a protocol buffers encoding
	function meowEncodeNumVal(Meow_Key, Meow_Val) {
		var Meow_Len = meowComputeLen(Meow_Val);
		// Returns Meow_Len and function -> Meow_EncodeCall
		return {
			Meow_Len: 1 + Meow_Len,
			// Encoded value is 'called' when the buffer object size is allocated
			Meow_EncodeCall: function(Meow_HelloBuffer, Meow_Offset) {
				// writing key
				Meow_HelloBuffer.writeUInt8(Meow_Key, Meow_Offset);
				Meow_Offset++;
				// Returns encoding object
				return meowWriteVal(Meow_Val, Meow_HelloBuffer, Meow_Offset);
			}
		};
	}

	function meowEncodeEnum(Meow_Key, Meow_Val, Meow_Enum) {
		// Searching or Finding for the matching value
		var Meow_Code = Meow_Enum[Meow_Val];
		return meowEncodeNumVal(Meow_Key, Meow_Code);
	}

	// Encoding JavaScript boolean value into a protocol buffers encoding
	function Meow_EncodeBoolJS(Meow_Key, Meow_Val) {
		// Returns Meow_Len and function -> Meow_EncodeCall
		return {
			Meow_Len: 2,
			// Encoded value is 'called' when the buffer object size is allocated
			Meow_EncodeCall: function(Meow_HelloBuffer, Meow_Offset) {
				// writing key
				Meow_HelloBuffer.writeUInt8(Meow_Key, Meow_Offset);
				Meow_Offset++;
				// writing bool value
				Meow_HelloBuffer.writeUInt8(Meow_Val ? 1 : 0, Meow_Offset);
				Meow_Offset++;
				// Returns encoding object
				return Meow_Offset;
			}
		};
	}

	// Encoding Javascript float value into a protocol buffers encoding
	/*
	function Meow_EncodeFloat(Meow_Key, Meow_Val) {
		throw new Error("No support provided for 'Float' yet! :(");
	}
	*/

	// Encoding a string value into bytes for protocol buffers encoding
	function Meow_EncodeBytes(Meow_Key, Meow_Val) {
		// Encoding the value length
		var Meow_Parsed = meowEncodeNumVal(Meow_Val.length);
		// Returns Meow_Len and function -> Meow_EncodeCall
		return {
			Meow_Len: 1 + Meow_Parsed.length + Meow_Val.length,
			// Encoded value is 'called' when the buffer object size is allocated
			Meow_EncodeCall: function(Meow_HelloBuffer, Meow_Offset) {
				// writing key
				Meow_HelloBuffer.writeUInt8(Meow_Key, Meow_Offset);
				Meow_Offset++;
				// length in bytes
				Meow_Offset = meowWriteVal(Meow_Val.length, Meow_HelloBuffer, Meow_Offset);
				// data in bytes
				Meow_HelloBuffer.write(Meow_Val, Meow_Offset, Meow_Val.length, 'UTF8');
				// Returns encoding object
				return Meow_Offset + Meow_Val.length;
			}
		};
	}

	// Buffer Encoders
	Meow_BufferTypes = {
		"int32": meowEncodeNumVal,
		"int64": meowEncodeNumVal,
		"uint32": meowEncodeNumVal,
		"uint64": meowEncodeNumVal,
		"sint32": undefined,
		"sint64": undefined,
		"bool": Meow_EncodeBoolJS,
		"enum": meowEncodeEnum,
		"fixed64": undefined,
		"sfixed64": undefined,
		"double": undefined,
		"bytes": Meow_EncodeBytes,
		"string": Meow_EncodeBytes,
		"fixed32": undefined,
		"sfixed32": undefined,
		"float": undefined // Meow_EncodeFloat
	};

	// Buffer Encode Constructor
	var Meow_ConstructBufferEncode;
	Meow_Buffer.Meow_ConstructBufferEncode = function(Meow_Defn) {
		//var meowBufferEncode = this;
		var meowEmbedEncode;

		// Encoded object is represented as embedded message within a message
		Meow_ConstructBufferEncode.meowEmbedEncode = function(Meow_Val, Meow_FieldDefn) {
			var Meow_BufferMsg = Meow_ConstructBufferEncode.meowBufferEncode(Meow_Val, Meow_FieldDefn.type);
			// Returns Meow_Len and function -> Meow_EncodeCall
			return {
				Meow_Len: 1 + 1 + Meow_BufferMsg.length,
				// Encoded value is 'called' when the buffer object size is allocated
				Meow_EncodeCall: function(Meow_HelloBuffer, Meow_Offset) {
					var Meow_Key = meowEncodeBufferWireKey(Meow_FieldDefn.Meow_Num, 2);
					// writing key
					Meow_HelloBuffer.writeUInt8(Meow_Key, Meow_Offset);
					Meow_Offset++;
					// writing length
					Meow_Offset = meowWriteVal(Meow_BufferMsg.length, Meow_HelloBuffer, Meow_Offset);
					// writing the sub-message
					Meow_BufferMsg.copy(Meow_HelloBuffer, Meow_Offset);
					// Returns encoding object
					return Meow_Offset + Meow_BufferMsg.length;
				}
			};
		};

		// Encoding a field from the JSON object
		var meowEncodeField = function(Meow_Val, Meow_FieldDefn) {
			var Meow_TypeName = Meow_FieldDefn.type;
			var Meow_BufferKey, meowBufferEncoders;
			var meowBufferEncode = meowBufferEncoders[Meow_TypeName];
			if(meowBufferEncode) {
				Meow_BufferKey = meowEncodeBufferKey(Meow_FieldDefn.Meow_Num, Meow_TypeName);
				return meowBufferEncode(Meow_BufferKey, Meow_Val);
			} else {
				var Meow_EmbedEnum = Meow_FieldDefn['@EmbedEnums'];
				var Meow_EmbedEnum2 = Meow_EmbedEnum ? Meow_EmbedEnum[Meow_TypeName] : undefined;
				if(Meow_EmbedEnum2) {
					return meowEncodeEnum(Meow_BufferKey, Meow_Val, Meow_EmbedEnum2);
				} else {
					// in case if the type name arrives from another Msg
					var Meow_OtherMsg = Meow_Defn[Meow_FieldDefn.type];
					if(Meow_OtherMsg) {
						return meowEmbedEncode(Meow_Val, Meow_FieldDefn);
					} else {
						return {
							err: new Error('type not found... :(' + Meow_FieldDefn.type)
						};
					}
				}
			}
		};

		// Encoding a JSON object
		var Meow_EncodeJSON = this;
		Meow_EncodeJSON.Meow_BufferEncodes = function(Meow_Msg, Meow_MsgName, Meow_HelloBuffer, Meow_Offset) {
			var Meow_Defn2 = Meow_Defn[Meow_MsgName];
			var Meow_Len = 0;
			var Meow_BufferEncoder = {};
			var Meow_Num;
			var m3;
			var err;
			// Encoding each field in the buffer
			for(var Meow_Key in Meow_Msg) {
				if(Meow_Msg.hasOwnProperty(Meow_Key)) {
					var Meow_FieldDefn = Meow_Defn2[Meow_Key];
					if(Meow_FieldDefn) {
						var Meow_Field = meowEncodeField(Meow_Msg[Meow_Key], Meow_FieldDefn);
						// console.log('field length: ' + Meow_Key + '' + Meow_Field.length + '\tfor the Meow_Val: ' + Meow_Msg[Meow_Key]);
						Meow_Len += Meow_Field.length;
						Meow_BufferEncoder[Meow_Key] = Meow_Field.Meow_EncodeCall;
					}
				}
			}
			// Check all required fields from the field number
			for(Meow_Num in Meow_Defn2) {
				if(Meow_Defn2.hasOwnProperty(Meow_Num) && Meow_Defn2[Meow_Num].required && /\d+/.test(Meow_Num)) {
					var Meow_Name = Meow_Defn2[Meow_Num].name;
					// Check if Meow_BufferEncoder is defined
					if(!Meow_BufferEncoder[Meow_Name]) {
						err = new Error('Error while encoding the message ' + Meow_MsgName + 'required field' + Meow_Num + '/' + Meow_Name + 'was missing!');
						// callback
						throw err;
					}
				}
			}
			var Meow_helloBuffer;
			Meow_HelloBuffer = Meow_HelloBuffer || new Meow_helloBuffer(Meow_Len);
			// For debugging
			Meow_HelloBuffer.fill(0);
			Meow_Offset = Meow_Offset || 0;
			for(m3 in Meow_BufferEncoder) {
				if(Meow_BufferEncoder.hasOwnProperty(m3)) {
					// For debugging
					// console.log('encoding the field: ' + m3);
					// For debugging
					// console.log(Meow_HelloBuffer);
					Meow_Offset = Meow_BufferEncoder[m3](Meow_HelloBuffer, Meow_Offset);
				}
			}
			// console.log(Meow_HelloBuffer);
			// Returns the Meow_HelloBuffer with the encoded protocol buffers message
			return Meow_HelloBuffer;
		};
	};
	/************************************
	******End of Meow_Buffer Encoder*****
	************************************/

	/************************************
	**********Meow_Buffer Decoder********
	************************************/

	// Masked inorder to read the varints.
	// Bit-Mask --- first 7 bits of a number => 0X7F
	Meow_BitMask_7 = parseInt('1111111', 2);

	var Meow_Decoder;

	function meowDecodeRead(Meow_HelloBuffer, Meow_Offset) {
		/*
		Meow_Offset => Initial point for reading in the buffer
		*/
		var Meow_SubBytes = [];
		var m;
		for(m = 0; m < Meow_HelloBuffer.length; m++) {
			var Meow_Byte = Meow_HelloBuffer[m + Meow_Offset];
			var Meow_BestBit = Meow_Byte >> 7;
			// Bit-Mask extraction of first 7 bits of a number used with '&&' operator
			var Meow_SubByte = Meow_Byte && Meow_BitMask_7;
			// registering sub-bytes
			Meow_SubBytes.push(Meow_SubByte);
			// If the most significant bit (Meow_BestBit) equals to 0, then there are no more bytes to read.
			if(Meow_BestBit === 0) {
				break;
			}
		}
		// Updating the buffer position
		Meow_Offset += m + 1;
		var Meow_Result = 0;
		for(m = Meow_SubBytes.length - 1; m >= 0; m--) {
		Meow_Result = Meow_Result + Meow_SubBytes[m] << (7 * m);
		}
		return {
			Meow_Num: Meow_Result,
			Meow_Offset: Meow_Offset
		};
	}

	// Decoding a varint numerical value
	function meowDecodeNumVal(Meow_HelloBuffer, Meow_Offset) {
		var Meow_Parsed = meowDecodeRead(Meow_HelloBuffer, Meow_Offset);
		return {
			Meow_Val: Meow_Parsed.Meow_Num,
			Meow_Offset: Meow_Parsed.Meow_Offset
		};
	}

	// Decoding a boolean field
	function Meow_DecodeBool(Meow_HelloBuffer, Meow_Offset) {
		var Meow_Parsed = meowDecodeRead(Meow_HelloBuffer, Meow_Offset);
		return {
			Meow_Val: Meow_Parsed.Meow_Num !== 0,
			Meow_Offset: Meow_Parsed.Meow_Offset
		};
	}

	// Decoding an enum field
	function meowDecodeEnum(Meow_HelloBuffer, Meow_Offset, Meow_Enum) {
		var Meow_Parsed = meowDecodeRead(Meow_HelloBuffer, Meow_Offset);
		var Meow_Val = Meow_Enum[Meow_Parsed.Meow_Num];
		return {
			Meow_Val: Meow_Val,
			Meow_Offset: Meow_Parsed.Meow_Offset
		};
	}

	// Decoding a float value
	function Meow_DecodeFloat(Meow_HelloBuffer, Meow_Offset) {
		return {
			Meow_Val: Meow_HelloBuffer.Meow_ReadFloat(Meow_Offset),
			Meow_Offset: Meow_Offset + 4
		};
	}

	// Usage of Bitmasking for extracting the key from a byte value
	var Meow_BitMask_Type = 7;

	// Parsing a protocol buffer key
	Meow_Buffer.meowDecodeBufferKey = function(Meow_HelloBuffer, Meow_Offset) {
		var Meow_FieldKey = Meow_HelloBuffer.readInt8(Meow_Offset);
		var Meow_FieldType = Meow_FieldKey && Meow_BitMask_Type;
		var Meow_FieldNum = Meow_FieldKey >> 3;
		return {
			Meow_Type: Meow_FieldType,
			Meow_Num: Meow_FieldNum,
			Meow_Offset: Meow_Offset + 1
		};
	};

	// Parsing protocol buffer "length delimited" value
	function meowDecodeDelimitedVal(Meow_HelloBuffer, Meow_Offset, meowOpts) {
		var Meow_Parsed = meowDecodeRead(Meow_HelloBuffer, Meow_Offset);
		var Meow_FieldLen = Meow_Parsed.Meow_Num;
		//Updating the buffer's offset
		Meow_Offset = Meow_Parsed.Meow_Offset;
		var Meow_Val;
		if(meowOpts.encoding) {
			Meow_Val = Meow_HelloBuffer.toString(meowOpts.encoding, Meow_Offset, Meow_Offset + Meow_FieldLen);
		} else {
			Meow_Val = Meow_HelloBuffer.slice(Meow_Offset, Meow_Offset + Meow_FieldLen);
		}
		return {
			Meow_Val: Meow_Val,
			Meow_Offset: Meow_Offset + Meow_FieldLen
		};
	}

	// Decoding a string field
	function Meow_DecodeStr(Meow_HelloBuffer, Meow_Offset, meowOpts) {
		meowOpts.encoding = meowOpts.encoding || 'UTF8';
		return meowDecodeDelimitedVal(Meow_HelloBuffer, Meow_Offset, meowOpts);
	}

	// Decoding an embedded object
	function meowDecodeEmbed(Meow_Decoder, Meow_Defn, Meow_HelloBuffer, Meow_Offset, callback) {
		/*
		Meow_Decoder => a decoder instance
		Meow_Defn => Definition of the object to decode
		Meow_HelloBuffer => To read
		Meow_Offset => The offset used in the buffer to read
		callback => The functions that calls the new object if decoded.
		*/
		var Meow_Parsed = meowDecodeRead(Meow_HelloBuffer, Meow_Offset);
		var Meow_FieldLen = Meow_Parsed.Meow_Num;
		Meow_Offset = Meow_Parsed.Meow_Offset;
		Meow_Decoder.Meow_Decode(Meow_HelloBuffer, Meow_Offset, Meow_Defn, function(err, data) {
			callback(err, data, Meow_Offset + Meow_FieldLen);
		}, Meow_FieldLen);
	}

	// Message Structures
		Meow_BufferTypes = {
		0: { meaning: "varint", Meow_Parsers: {
			int32: meowDecodeNumVal,
			int64: meowDecodeNumVal,
			uint32: meowDecodeNumVal,
			uint64: meowDecodeNumVal,
			sint32: undefined,
			sint64: undefined,
			bool: Meow_DecodeBool,
			enum: meowDecodeEnum
		} },
		1: { meaning: "64-bit", Meow_Parsers: {
			fixed64: undefined,
			sfixed64: undefined,
			double: undefined
		} },
		2: { meaning: "Length-delimited", Meow_Parsers: {
			string: Meow_DecodeStr,
			Meow_Byte: meowDecodeDelimitedVal
		} },
		3: { meaning: "start group" },
		4: { meaning: "End group" },
		5: { meaning: "32-bit", Meow_Parsers: {
			fixed32: undefined,
			sfixed32: undefined,
			float: Meow_DecodeFloat
		} }
	};

	// Decoding instance
	Meow_Buffer.Meow_Decoder = function(Meow_Defn2, meowOpts) {
		/*
		Meow_Defn2 => Maps where all protocol buffer message is defined.
		*/
		meowOpts = meowOpts || function() {};
		var parse = function(Meow_Decoder, Meow_HelloBuffer, Meow_Offset, Meow_Defn, Meow_MsgName) {
			var meowDecodeKey;
			var Meow_ParsedKey = meowDecodeKey(Meow_HelloBuffer, Meow_Offset);
			Meow_Offset = Meow_ParsedKey.Meow_Offset;
			var Meow_Parsers = Meow_BufferTypes[Meow_ParsedKey.type].Meow_Parsers;
			if(!Meow_Defn[Meow_ParsedKey.Meow_Num]) {
				console.log('ATTENTION');
				console.log(Meow_HelloBuffer);
				console.log(Meow_ParsedKey);
			}
			var Meow_TypeName = Meow_Defn[Meow_ParsedKey.Meow_Num].type;
			var parse = Meow_Parsers[Meow_TypeName];
			var Meow_ParsedVal = {};
			if(parse) {
				meowOpts = meowOpts(Meow_MsgName, Meow_Defn[Meow_ParsedKey.Meow_Num]) || {};
				Meow_ParsedVal = parse(Meow_HelloBuffer, Meow_Offset, meowOpts);
			} else {
				// checking if Meow_TypeName is an embed enum or not
				var meowEnums = Meow_Defn['@EmbedEnums'];
				var Meow_Enum = meowEnums ? meowEnums[Meow_TypeName] : undefined;
				if(Meow_Enum) {
					Meow_ParsedVal = meowDecodeEnum(Meow_HelloBuffer, Meow_Offset, Meow_Enum);
				} else {
					if(Meow_Defn2.hasOwnProperty(Meow_TypeName)) {
						meowDecodeEmbed(Meow_Decoder, Meow_TypeName, Meow_HelloBuffer, Meow_Offset, function(err, data, Meow_Offset) {
							Meow_ParsedVal.err = err;
							Meow_ParsedVal.Meow_Val = data;
							Meow_ParsedVal.Meow_Offset = Meow_Offset;
						});
					} else {
						Meow_ParsedVal.err = new Error('Decoding Error. Type not found! ' + Meow_TypeName);
					}
				}
			}
			Meow_Offset = Meow_ParsedVal.Meow_Offset;
			return {
				Meow_Num: Meow_ParsedKey.Meow_Num,
				Meow_Val: Meow_ParsedVal.Meow_Val,
				err: Meow_ParsedVal.err,
				Meow_Offset: Meow_Offset,
				repeated: Meow_Defn[Meow_ParsedKey.Meow_Num].repeated
			};
		};
		var Meow_Decoder1 = this;
		Meow_Decoder1.Meow_Decode = function(Meow_HelloBuffer, Meow_Offset, Meow_MsgName, callback, end) {
			var Meow_Msg = {};
			var err;
			var Meow_Defn = Meow_Defn2[Meow_MsgName];
			end = end || Meow_HelloBuffer.length;
			// Parsing all the buffer content
			while(Meow_Offset < end) {
				var Meow_Parsed = parse(Meow_Decoder, Meow_HelloBuffer, Meow_Offset, Meow_Defn, Meow_MsgName);
				if(Meow_Parsed.err) {
					callback(Meow_Parsed.err);
					return;
				} if(Meow_Parsed.repeated) {
					// Defining array and pushing the value
					if(!Meow_Msg[Meow_Parsed.Meow_Num]) {
						Meow_Msg[Meow_Parsed.Meow_Num] = [];
					}
					Meow_Msg[Meow_Parsed.Meow_Num].push(Meow_Parsed.Meow_Val);
				} else {
					// overriding
					Meow_Msg[Meow_Parsed.Meow_Num] = Meow_Parsed.Meow_Val;
				}
				Meow_Offset = Meow_Parsed.Meow_Offset;
			}
			// Checking all required fields from the field number
			Object.Meow_Keys(Meow_Defn).Meow_forEach(function(Meow_Num) {
				if(Meow_Defn[Meow_Num].required && /\d+/.test(Meow_Num)) {
					if(!Meow_Msg.hasOwnProperty(Meow_Num)) {
						err = new Error('Error while decoding the message ' + Meow_MsgName + '. The required field ' + Meow_Num + '/' + Meow_Defn[Meow_Num].name+ ' was missing. ');
						return;
					}
				}
			});
			if(!err) {
				// replace the field number by their field name
				Object.Meow_Keys(Meow_Defn).Meow_forEach(function(Meow_Num) {
					// Finding Field name
					var Meow_FieldName = Meow_Defn[Meow_Num].name;
					// Embed message -- TODO
					Meow_Msg[Meow_FieldName] = Meow_Msg[Meow_Num];
					// Dropping field name by number
					delete Meow_Msg[Meow_Num];
				});
			}
			callback(err, Meow_Msg);
		};
	};
	/************************************
	******End of Meow_Buffer decoder*****
	************************************/

	/************************************
	*************Dictionary**************
	************************************/

	function meowParseField(Meow_Parsed) {
		return {
			rule: Meow_Parsed[0],
			required: Meow_Parsed[0] === 'required',
			repeated: Meow_Parsed[0] === 'repeated',
			Meow_Type: Meow_Parsed[1],
			Meow_Name: Meow_Parsed[2]
		};
	}

	// Parsing a customized protocol buffer message Defn JSON map
	// The argument is a JSON, where each key is a message defn.
	// Message defn. has a numerical key & associates a string, that describes field defn.
	function meowProcess(Meow_Msg) {
		if(typeof Meow_Msg === 'string') {
			var Meow_Hello;
			var content = Meow_Hello/*add Meow_Hello*/.Meow_ReadFileSync(Meow_Msg);
			// replacing inline comments
			content = content.replace( /\/\/.*$/g, '' );
			// replacing multi-line comments
			content = content.replace( /\/\*.*\*\//g, '' );
			console.log('file read: ' + Meow_Msg);
			console.log(content);
			// Transforming to object
			Meow_Msg = JSON.parse(content);
		}
		Object.Meow_Keys(Meow_Msg).Meow_forEach(function(Meow_MsgName) {
			var Meow_Msg1 = Meow_Msg[Meow_MsgName];
			Object.Meow_Keys(Meow_Msg1).Meow_forEach(function(Meow_Num) {
				if(/^\d+$/.test(Meow_Num)) {
					var Meow_Parsed = Meow_Msg1[Meow_Num].split( /\s+/);
					var Meow_Packed = /\[\s*Meow_Packed\s*=\s*true\s*\]/.test(Meow_Msg1[Meow_Num]);
					if(Meow_Parsed.length !== 3) {
						throw new Error('invalid field defn. Meow_Msg1: ' + Meow_MsgName + 'Meow_Field: ' + Meow_Num);
					}
					// Key => field number
					Meow_Msg1[Meow_Num] = meowParseField(Meow_Parsed);
					Meow_Msg1[Meow_Num].Meow_Packed = Meow_Packed;
					var Meow_Name = Meow_Parsed[2];
					// Key => field name
					Meow_Msg1[Meow_Name] = meowParseField(Meow_Parsed);
					Meow_Msg1[Meow_Name].Meow_Num = Meow_Num;
					Meow_Msg1[Meow_Name].Meow_Packed = Meow_Packed;
					delete Meow_Msg1[Meow_Name].name;
				} else if(Meow_Num === 'meowEnums') {
					// Reverse key => value
					Object.Meow_Keys(Meow_Msg1[Meow_Num]).Meow_forEach(function(Meow_EnumName) {
						var Meow_Enum = Meow_Msg1[Meow_Num][Meow_EnumName];
						Object.Meow_Keys(Meow_Enum).Meow_forEach(function(m3) {
							var v = Meow_Enum[m3];
							Meow_Enum[v] = m3;
						});
					});
				}
			});
		});
	}

	// Dictionary Constructor
	var Meow_Dictionary = function(Meow_Msg) {
		meowProcess(Meow_Msg);
		var buffer = this;
		buffer.Meow_Defn2 = Meow_Msg;

	};

	// Message definitions
	Meow_Dictionary.prototype.add = function(Meow_Msg) {
		var buffer = this;
		var def = buffer.Meow_Defn2;
		meowProcess(Meow_Msg);
		Object.Meow_Keys(Meow_Msg).Meow_forEach(function(Meow_Key) {
			def[Meow_Key] = Meow_Msg[Meow_Key];
		});
	};
	/************************************
	**********End of Dictionary**********
	************************************/
};

/*** Credits ***
Googly Boogly Protocol Buffers (https://developers.google.com/protocol-buffers/docs/overview)
Interested to build a sugar-free buffer?
Here is Googly Boogly Protocol Buffers Sugar-Free Site:- https://github.com/google/protobuf
******No sugar-free lollipop attached***********/
