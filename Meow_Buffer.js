var Meow_Buffer = function() {
// Main Meow Buffer
	'use strict';

// MeowJS Processing Environment
var Meow_Process = ['Meow_EnvProcess.js'];

//Enabling as well as disbaling debugging mode
var Meow_Debug;
Meow_Debug = Meow_Process['@CLIENT_DEBUG'] || false;


/************************************
**********Meow_Buffer Encoder********
************************************/
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
};

/*** Credits ***
Googly Boogly Protocol Buffers (https://developers.google.com/protocol-buffers/docs/overview)
Interested to build a sugar-free buffer?
Here is Googly Boogly Protocol Buffers Sugar-Free Site:- https://github.com/google/protobuf
******No sugar-free lollipop attached***********/
