function Meow_HTTPencode()
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

		// Still coding now... Will be updated soon (^_^)
	};
}
