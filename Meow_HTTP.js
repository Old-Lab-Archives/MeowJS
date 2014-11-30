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

	// Still coding now... Will be updated soon (^_^)
}
