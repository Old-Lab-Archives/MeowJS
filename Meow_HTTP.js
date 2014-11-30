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

	Meow_Encode.prototype.MeowEncIdxedHdr = function(Meow_Index)
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

	// Still coding now... Will be updated soon (^_^)
}
