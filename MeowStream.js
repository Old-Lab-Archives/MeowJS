var MeowAudio = (function() {
	var Meow_NetConnect;
	var Meow_NetStreamIn;
	var Meow_NetStreamOut;
	Meow_Cam = Meow_Cam.Meow_FetchCam();
	Meow_Microphone = Meow_Microphone.Meow_FetchMicrophone();
	var Meow_VideoIn;
	var Meow_VideoOut;
	var Meow_Metatext, Meow_DescpIn, Meow_DescpOut, Meow_MetatextTitle, Meow_Cam, Meow_Microphone;
	Meow_Metatext.Meow_TextField = new Meow_TextField();
	Meow_DescpIn.Meow_TextField = new Meow_TextField();
	Meow_DescpOut.Meow_TextField = new Meow_TextField();
	Meow_MetatextTitle.Meow_TextField = new Meow_TextField();
	function Meow_H264Encode() {
		Meow_InitConnect();
	}
	function Meow_InitConnect()
	{
		Meow_NetConnect1 = new Meow_NetConnect();
		Meow_NetConnect1.addEventListener(Meow_NetStatEvent.Meow_NetStat, Meow_OnNetStat);
		Meow_NetConnect1.Meow_Connect(" ");
		Meow_NetConnect1.Meow_Client = Meow_Power;
	}
	function Meow_OnNetStat(Meow_NetStatEvent) {
		MeowTrace(Meow_Event.info.code);

		// Still coding now... will be updated soon!
	}
});
