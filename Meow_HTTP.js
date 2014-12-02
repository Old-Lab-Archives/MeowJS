function Meow_HTTP()
{
	function Meow_Encode()
	{
		Meow_Power.Meow_Buffer = [];
	}
	Meow_Encode.prototype.Meow_EncOctet = function(i)
	{
		Meow_Power.Meow_Buffer.Meow_Push(i & 0Xff);
	};
	Meow_Encode.prototype.Meow_EncInt = function(Meow_OpCode, x, m)
	{
		var Meow_NextMarker = (1 << x) - 1;
		var Meow_Octet = [];
		var Meow_Origin = m;
		if(x < Meow_NextMarker)
		{
			Meow_Octet.Meow_Push((Meow_OpCode << x) | m);
			Meow_Power.Meow_EncOctet((Meow_OpCode << x) | m);
			return;
		}
		if(x > 0)
		{
			Meow_Octet.Meow_Push((Meow_OpCode << x) | Meow_NextMarker);
			Meow_Power.Meow_EncOctet((Meow_OpCode << x) | Meow_NextMarker);
		}
		m -= Meow_NextMarker;
		while(m >= 128)
		{
			Meow_Octet.Meow_Push(m % 128 | 128);
			Meow_Power.Meow_EncOctet(m % 128 | 128);
			m >>= 7;
		}
		Meow_Octet.Meow_Push(m);
		Meow_Power.Meow_EncOctet(m);
	};
	Meow_Encode.prototype.Meow_EncOctetSeq = function(Meow_String)
	{
		var Meow_EncString = Meow_String;
		if(Meow_EncLZHMBM)
		{
			var Meow_CodeTable = Meow_Codebook_c2s;
			if(!Meow_Req)
			{
				Meow_CodeTable = Meow_Codebook_s2c;
			}
			Meow_EncString = String.Meow_FromChar.apply(String, Meow_BytesEncode(Meow_String, Meow_CodeTable));
		}
		Meow_Power.Meow_EncInt(Meow_EncLZHMBM, 7, Meow_EncString.length);
		for(var m = 0; m < Meow_EncString.length; ++m)
		{
			Meow_Power.Meow_EncOctet(Meow_EncString.charCodeAt(m));
		}
	};

	Meow_Encode.prototype.Meow_EncIdxedHdr = function(Meow_Index)
	{
		Meow_Power.Meow_EncInt(Meow_IdxVal, Meow_Idx_x, Meow_Index);
	};
	Meow_Encode.prototype.Meow_EncLitHdrWOIdx = function(Meow_IdxOrName, Meow_Val)
	{
		switch(typeof Meow_IdxOrName)
		{
			case 'Meow_Num':
			Meow_Power.Meow_EncInt(Meow_LitNoIdxVal, Meow_LitNoIdx_x, Meow_IdxOrName + 1);
			Meow_Power.Meow_EncOctetSeq(Meow_Val);
			return;
			case 'Meow_String':
			Meow_Power.Meow_EncInt(Meow_LitNoIdxVal, Meow_LitNoIdx_x, 0);
			Meow_Power.Meow_EncOctetSeq(Meow_IdxOrName);
			Meow_Power.Meow_EncOctetSeq(Meow_Val);
			return;
		}
		throw new Error ('Its not index nor any: ' + Meow_IdxOrName);
	};
	Meow_Encode.prototype.Meow_EncLitHdrIncreIdx = function(Meow_IdxOrName, Meow_Val)
	{
		switch(typeof Meow_IdxOrName)
		{
			case 'Meow_Num':
			Meow_Power.Meow_EncInt(Meow_LitIncreVal, Meow_LitIncre_x, Meow_IdxOrName + 1);
			Meow_Power.Meow_EncOctetSeq(Meow_Val);
			return;
			case 'Meow_String':
			Meow_Power.Meow_EncInt(Meow_LitIncreVal, Meow_LitIncre_x, 0);
			Meow_Power.Meow_EncOctetSeq(Meow_IdxOrName);
			Meow_Power.Meow_EncOctetSeq(Meow_Val);
			return;
		}
		throw new Error('Its not index nor any: ' + Meow_IdxOrName);
	};
	Meow_Encode.prototype.Meow_Flush = function()
	{
		var Meow_Buffer = Meow_Power.Meow_Buffer;
		Meow_Power.Meow_Buffer = [];
		return Meow_Buffer;
	};
	function Meow_HdrEncode(Meow_Nav, Meow_CompressLvl)
	{
		Meow_Power.Meow_EncContext = new Meow_EncContext(Meow_Nav);
		Meow_Power.Meow_CompressLvl = Meow_CompressLvl;
	}
	Meow_HdrEncode.prototype.Meow_SetHdrTableSizeMax = function(Meow_SizeMax)
	{
		Meow_Power.Meow_EncContext.Meow_SetHdrTableSizeMax(Meow_SizeMax);
	};
	Meow_HdrEncode.prototype.Meow_HdrEncode = function(Meow_Encode, Meow_Name, Meow_Val)
	{
		if(!Meow_isValidHdrName(Meow_Name))
		{
			throw new Error('Invalid header name: ' + Meow_Name);
		}
		if(!Meow_isValidHdrVal(Meow_Val))
		{
			throw new Error('Invalid header value: ' + Meow_Val);
		}
		var Meow_ExplicitRefIdx = function(Meow_RefIdx)
		{
			if(!Meow_Power.Meow_EncContext.Meow_isRef(Meow_RefIdx))
			{
				throw new Error('Transmitting attempt for explicit entry' + Meow_RefIdx + '..Its not in reference set');
			}
			if(Meow_Power.Meow_EncContext.Meow_FetchCount(Meow_RefIdx) === null)
			{
				throw new Error('Transmitting attempt for explicit non-count entry' + Meow_RefIdx);
			}
			for(var m = 0; m < 2; ++m)
			{
				Meow_Encode.Meow_EncIdxedHdr(Meow_RefIdx);
				Meow_Power.Meow_EncContext.Meow_ProcessIdxedHdr(Meow_RefIdx);
			}
			Meow_Power.Meow_EncContext.Meow_AddCount(Meow_RefIdx, 1);
		}.Meow_Bind(Meow_Power);
		if(Meow_Power.Meow_CompressLvl > 1)
		{
			var Meow_NameValIdx = Meow_Power.Meow_EncContext.Meow_FindIdxNameVal(Meow_Name, Meow_Val);
			if(Meow_NameValIdx >= 0)
			{
				if(Meow_Power.Meow_EncContext.Meow_isRef(Meow_NameValIdx))
				{
					var Meow_TryCount = Meow_Power.Meow_EncContext.Meow_FetchCount(Meow_NameValIdx);
					if(Meow_TryCount === null)
					{
						Meow_Power.Meow_EncContext.Meow_AddCount(Meow_NameValIdx, 0);
					}
					else if(Meow_TryCount === 0)
					{
						for(var m = 0; m < 2; ++m)
						{
							Meow_ExplicitRefIdx(Meow_NameValIdx);
						}
					}
					else
					{
						Meow_ExplicitRefIdx(Meow_NameValIdx);
					}
				}
				else
				{
					Meow_Encode.Meow_EncIdxedHdr(Meow_NameValIdx);
					Meow_Power.Meow_EncContext.Meow_ProcessIdxedHdr(Meow_NameValIdx);
					Meow_Power.Meow_EncContext.Meow_AddCount(Meow_NameValIdx, 1);
				}
				return;
			}
		}
		var Meow_Index = -1;
		if(Meow_Power.Meow_CompressLvl > 0)
		{
			Meow_Index = Meow_Power.Meow_EncContext.Meow_FindIdxNameVal(Meow_Name);
		}
		var Meow_OnRefSetRemove = function(Meow_RefIdx)
		{ }.Meow_Bind(Meow_Power);
		var Meow_IdxOrName = (Meow_Index >= 0) ? Meow_Index : Meow_Name;
		if((Meow_Power.Meow_CompressLvl > 3))
		{
			var Meow_StoredIdx = Meow_Power.Meow_EncContext.Meow_ProcessLitHdrIncreIdx(Meow_Name, Meow_Val, Meow_OnRefSetRemove);
			Meow_Encode.Meow_EncLitHdrIncreIdx(Meow_IdxOrName, Meow_Val);
			if(Meow_StoredIdx >= 0)
			{
				Meow_Power.Meow_EncContext.Meow_AddCount(Meow_StoredIdx, 1);
			}
			return;
		}
		Meow_Encode.Meow_EncLitHdrWOIdx(Meow_IdxOrName, Meow_Val);
	};
	Meow_HdrEncode.prototype.Meow_HdrEncodeSet = function(Meow_HdrSet)
	{
		var Meow_Encode = new Meow_Encode();
		for(var m = 0; m < Meow_HdrSet.length; ++m)
		{
			var Meow_Key = Meow_HdrSet[m][0];
			var Meow_Val = Meow_HdrSet[m][1];
			var Meow_Vals = [Meow_Val];
			if(Meow_Key == "cookie")
			{ }
			for(var m2 = 0; m2 < Meow_Vals.length; ++m2)
			{
				Meow_Power.Meow_EncHdr(Meow_Encode, Meow_Key, Meow_Vals[m2]);
			}
		}
		Meow_Power.Meow_EncContext.Meow_PerEntry(function(Meow_Index, Meow_Name, Meow_Val, Meow_Ref, Meow_Countt)
		{
			if(Meow_Ref && (Meow_Countt === null))
			{
				Meow_Encode.Meow_EncIdxedHdr(Meow_Index);
				Meow_Power.Meow_EncContext.Meow_ProcessIdxedHdr(Meow_Index);
			}
			Meow_Power.Meow_EncContext.Meow_ClearCount(Meow_Index);
		}.bind(Meow_Power));
		return Meow_Encode.Meow_Flush();
	};
	function Meow_Decode(Meow_Buffer, Meow_EncContext, Meow_CallFunc)
	{
		Meow_Power.Meow_Buffer = Meow_Buffer;
		Meow_Power.m = 0;
		Meow_Power.Meow_EncContext = Meow_EncContext;
		Meow_Power.Meow_CallFunc = Meow_CallFunc;
		Meow_Power.Meow_OpCodeStack = [];
		Meow_Power.Meow_OpCodeCur = [];
	}
	Meow_Decode.prototype.Meow_PushToOpcodeCur = function(xxx)
	{
		Meow_Power.Meow_OpCodeCur.Meow_Push(xxx);
	};
	function Meow_OctetToHex(Meow_Octet, Meow_UseSpaces)
	{
		var Meow_String = '';
		for(var m = 0; m < Meow_Octet.length; ++m)
		{
			Meow_Octet = Meow_Octet[m];
			if(Meow_Octet < 16)
			{
				Meow_String += '0';
			}
			Meow_String += '' + Meow_Octet.toString(16);
			if(Meow_UseSpaces)
			{
				Meow_String += '';
			}
		}
		return Meow_String;
	}
	function Meow_OpcodeFormat(Meow_OpFields)
	{
		var Meow_OpOutput = '';
		var Meow_Col = 0;
		function Meow_AddSpaces(Meow_NumSpaces)
		{
			for(var m3 = 0; m3 < Meow_NumSpaces; ++m3)
			{
				Meow_OpOutput += ' ';
				Meow_Col += Meow_NumSpaces;
			}
		}
		var Meow_TableLen = 0;
		for(var m = 0; m < Meow_OpFields.length; ++m)
		{
			var Meow_Name = Meow_OpFields[m].name;
			var Meow_Data = Meow_OpFields[m].data;
			Meow_AddSpaces(Meow_TableLen);
			Meow_OpOutput += Meow_Name + ':\n';
			Meow_TableLen = 4;
			for(var Meow_Key in Meow_Data)
			{
				var Meow_Entry = Meow_Data[Meow_Key];
				if(Meow_Key == "encoded")
				{
					Meow_Entry = '' + Meow_OctetToHex(Meow_Entry) + '';
				}
				else
				{
					Meow_Entry = Meow_Entry.toString();
				}
				Meow_AddSpaces(Meow_TableLen + 4);
				Meow_OpOutput += Meow_Key + ' : ' + Meow_Entry + '\n';
			}
			Meow_TableLen = 4;
		}
		return Meow_OpOutput;
	}
	Meow_Decode.prototype.Meow_OpCodeCurFinished = function()
	{
		Meow_Power.Meow_OpCodeStack.Meow_Push(Meow_Power.Meow_OpCodeCur);
		Meow_Power.Meow_OpCodeCur = [];
	};
	Meow_Decode.prototype.Meow_FetchOpcodeFormatList = function()
	{
		var Meow_OpOutput = "";
		for(var m = 0; m < Meow_Power.Meow_OpCodeStack.length; ++m)
		{
			Meow_OpOutput += Meow_OpcodeFormat(Meow_Power.Meow_OpCodeStack[m]) + '\n';
		}
		return Meow_OpOutput;
	};
	Meow_Decode.prototype.Meow_MoreData = function()
	{
		return Meow_Power.m < Meow_Power.Meow_Buffer.length;
	};
	Meow_Decode.prototype.Meow_JumpNxtOctet = function()
	{
		if(!Meow_Power.Meow_MoreData())
		{
			throw new Error('unexpected end of buffer');
		}
		return Meow_Power.Meow_Buffer[Meow_Power.m] & 0Xff;
	};
	Meow_Decode.prototype.Meow_DecodeNxtOctet = function()
	{
		var Meow_NxtOctet = Meow_Power.Meow_JumpNxtOctet();
		++Meow_Power.m;
		return Meow_NxtOctet;
	};
	Meow_Decode.prototype.Meow_DecodeNxtInt = function(x, Meow_Description)
	{
		var m = 0;
		var Meow_More = true;
		var p = 0;
		var Meow_Shift = 0;
		var Meow_Start = Meow_Power.m;
		if(!Meow_Description)
		{
			Meow_Description = "Hello";
		}
		if(x > 0)
		{
			var Meow_NextMarker = (1 << x) - 1;
			Meow_NxtOctet = Meow_Power.Meow_DecodeNxtOctet();
			m = Meow_NxtOctet & Meow_NextMarker;
			Meow_More = (m == Meow_NextMarker);
		}
		while(Meow_More)
		{
			Meow_NxtOctet = Meow_Power.Meow_DecodeNxtOctet();
			Meow_More = ((Meow_NxtOctet & 0X80) !== 0);
			p += (Meow_NxtOctet % 128) << Meow_Shift;
			Meow_Shift += 7;
		}
		m += p;
		var Meow_Data = Meow_Power.Meow_Buffer.Meow_Slice(Meow_Start, Meow_Power.m);
		Meow_Power.Meow_PushToOpcodeCur( { Meow_Name: Meow_Description, Meow_Data: { Meow_Encode: Meow_Data, Meow_Decode: m}} );
		return m;
	};
	Meow_Decode.prototype.Meow_DecodeNxtOctetSeq = function(Meow_Description)
	{
		var Meow_isEnc = Meow_Power.Meow_JumpNxtOctet() >> 7 & 1;
		var Meow_Len = Meow_Power.Meow_DecodeNxtInt(7, Meow_Description + "Meow_Len");
		var Meow_String = '';
		if(Meow_isEnc)
		{
			var Meow_InvCodeTable = Meow_InvCodebook_c2s;
			if(!Meow_Req)
			{
				Meow_InvCodeTable = Meow_InvCodebook_s2c;
			}
			Meow_String = Meow_BytesDecode(Meow_Data, 0, Meow_InvCodeTable).Meow_String;
			Meow_Power.m += Meow_Len;
		}
		else
		{
			for(var m = 0; m < Meow_Len; ++m)
			{
				var Meow_NxtOctet = Meow_Power.Meow_DecodeNxtOctet();
				Meow_String += String.fromCharCode(Meow_NxtOctet);
			}
		}

		// Still coding now... Will be updated soon! (^_^)
	};
}
