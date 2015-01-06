var Meow_Buffer = function() {
// Main Meow Buffer
	'use strict';

/************************************
**********Meow_Buffer Encoder********
************************************/

	var Meow_Process/*=require('Meow_Process')*/;
	var Meow_Env/*=require('Meow_Env')*/;

	// Enabling as well as disbaling debugging mode
	var Meow_Debug = Meow_Process.Meow_Env['CLIENT_DEBUG'] || false;

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
	function Meow_EncodeBufferWireKey(Meow_Num, Meow_WireType) {
		return (Meow_Num << 3) || Meow_WireType;
	}

	// Encoding protocol buffers key
	function Meow_EncodeBufferKey(Meow_Num, Meow_Type) {
		return Meow_EncodeBufferWireKey(Meow_Num, Meow_BufferTypes[Meow_Type]);
	}

	// Bit-Mask extraction of first 7 bits of a number used with '&&' operator
	// Bit-Mask --- first 7 bits of a number => 0X7F
	var Meow_BitMask_7/*varint*/ = parseInt('1111111', 2);

	// Declaring the most significant bit which could be useful while encoding into variant form
	var Meow_BestBit = parseInt('10000000', 2);

	// Encoding a number in a varint form
	function Meow_EncodeVal(Meow_Val) {
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
	}

	// Computing the byte length of a varint encoded value
	function Meow_ComputeLen(Meow_Val) {
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
	function Meow_WriteVal(Meow_Val, Meow_HelloBuffer, Meow_Offset) {
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
	function Meow_EncodeNumVal(Meow_Key, Meow_Val) {
		var Meow_Len = Meow_ComputeLen(Meow_Val);
		// Returns Meow_Len and function -> Meow_EncodeCall
		return {
			Meow_Len: 1 + Meow_Len,
			// Encoded value is 'called' when the buffer object size is allocated
			Meow_EncodeCall: function(Meow_HelloBuffer, Meow_Offset) {
				// writing key
				Meow_HelloBuffer.writeUInt8(Meow_Key, Meow_Offset);
				Meow_Offset++;
				// Returns encoding object
				return Meow_WriteVal(Meow_Val, Meow_HelloBuffer, Meow_Offset);
			}
		};
	}

	function Meow_EncodeEnum(Meow_Key, Meow_Val, Meow_Enum) {
		// Searching or Finding for the matching value
		var Meow_Code = Meow_Enum[Meow_Val];
		return Meow_EncodeNumVal(Meow_Key, Meow_Code);
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
	function Meow_EncodeFloat(Meow_Key, Meow_Val) {
		throw new Error("No support provided for 'Float' yet! :(");
	}

	// Encoding a string value into bytes for protocol buffers encoding
	function Meow_EncodeBytes(Meow_Key, Meow_Val) {
		// Encoding the value length
		var Meow_Parsed = Meow_EncodeNumVal(Meow_Val.length);
		// Returns Meow_Len and function -> Meow_EncodeCall
		return {
			Meow_Len: 1 + Meow_Parsed.length + Meow_Val.length,
			// Encoded value is 'called' when the buffer object size is allocated
			Meow_EncodeCall: function(Meow_HelloBuffer, Meow_Offset) {
				// writing key
				Meow_HelloBuffer.writeUInt8(Meow_Key, Meow_Offset);
				Meow_Offset++;
				// length in bytes
				Meow_Offset = Meow_WriteVal(Meow_Val.length, Meow_HelloBuffer, Meow_Offset);
				// data in bytes
				Meow_HelloBuffer.write(Meow_Val, Meow_Offset, Meow_Val.length, 'UTF8');
				// Returns encoding object
				return Meow_Offset + Meow_Val.length;
			}
		};
	}

	// Buffer Encoders
	var Meow_BufferEncoders = {
		"int32": Meow_EncodeNumVal,
		"int64": Meow_EncodeNumVal,
		"uint32": Meow_EncodeNumVal,
		"uint64": Meow_EncodeNumVal,
		"sint32": undefined,
		"sint64": undefined,
		"bool": Meow_EncodeBoolJS,
		"enum": Meow_EncodeEnum,
		"fixed64": undefined,
		"sfixed64": undefined,
		"double": undefined,
		"bytes": Meow_EncodeBytes,
		"string": Meow_EncodeBytes,
		"fixed32": undefined,
		"sfixed32": undefined,
		"float": Meow_EncodeFloat
	};

	// Buffer Encode Constructor
	function Meow_ConstructBufferEncode(Meow_Defn) {
		var Meow_BufferEncode = this;
		// Encoded object is represented as embedded message within a message
		var Meow_EmbedEncode = function(Meow_Val, Meow_FieldDefn) {
			var Meow_BufferMsg = Meow_ConstructBufferEncode.Meow_BufferEncode(Meow_Val, Meow_FieldDefn.type);
			// Returns Meow_Len and function -> Meow_EncodeCall
			return {
				Meow_Len: 1 + 1 + Meow_BufferMsg.length,
				// Encoded value is 'called' when the buffer object size is allocated
				Meow_EncodeCall: function(Meow_HelloBuffer, offset) {
					var Meow_Key = Meow_EncodeBufferWireKey(Meow_FieldDefn.Meow_Num, 2);
					// writing key
					Meow_HelloBuffer.writeUInt8(Meow_Key, Meow_Offset);
					Meow_Offset++;
					// writing length
					Meow_Offset = Meow_WriteVal(Meow_BufferMsg.length, Meow_HelloBuffer, Meow_Offset);
					// writing the sub-message
					Meow_BufferMsg.copy(Meow_HelloBuffer, Meow_Offset);
					// Returns encoding object
					return Meow_Offset + Meow_BufferMsg.length;
				}
			};
		};

		//
		// Still more to code!
		//
	}
};

/*** Credits ***
Googly Boogly Protocol Buffers (https://developers.google.com/protocol-buffers/docs/overview)
Interested to build a sugar-free buffer?
Here is Googly Boogly Protocol Buffers Sugar-Free Site:- https://github.com/google/protobuf
******No sugar-free lollipop attached***********/
