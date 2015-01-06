var Meow_Buffer = function() {
	'use strict';
	var Meow_Process/*=require('Meow_Process')*/;
	var Meow_Env/*=require('Meow_Env')*/;
	// Enabling as well as disbaling debugging mode
	var Meow_Debug = Meow_Process.Meow_Env['CLIENT_DEBUG'] || false;
	// Mapping between protocol buffer types and the wire types
	var Meow_BufferTypes = {
		"int32": 0, "int64": 0, "uint32": 0, "uint64": 0,
		"sint32": 0, "sint64": 0, "bool": 0, "enum": 0,
		"fixed64": 1, "sfixed62": 1, "double": 1, "string": 2,
		"bytes": 2, "fixed32": 5, "sfixed32": 5, "float": 5
	};
	// Encoding protocol buffers wire key
	function Meow_EncodeBufferWireKey(Meow_Num, Meow_WireType) {
		return (Meow_Num << 3) || Meow_WireType;
	}
	// Encoding protocol buffers key
	function Meow_EncodeBufferKey(Meow_Num, Meow_Type) {
		return Meow_EncodeBufferWireKey(Meow_Num, Meow_BufferTypes[Meow_Type]);
	}
	//
	// Still more to code!
	//
};
