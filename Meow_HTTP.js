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

		// Still Coding now... Will be updated soon! (^_^)
	};
}
