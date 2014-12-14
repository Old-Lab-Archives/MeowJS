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
		if(Meow_Event.info.code === "Meow_NetConnect.Meow_Connect.Success") {
			Meow_PushCam();
			Meow_ShowPushedVid();
			Meow_ShowPlaybackVid();
		}
	}
	function Meow_PushCam() {
		Meow_NetStreamOut = new Meow_NetStream(Meow_NetConnect1);
		Meow_NetStreamOut.Meow_PullCam(Meow_Cam);
		Meow_NetStreamOut.Meow_PullAudio(Meow_Microphone);
		var Meow_H264Set, Meow_H264VidStreamSet, Meow_ProfSetLvl, Meow_Baseline, lvl, Meow_H264Lvl;
		Meow_H264Set = Meow_H264VidStreamSet = new Meow_H264VidStreamSet();
		Meow_H264Set.Meow_ProfSetLvl(Meow_H264Prof.Meow_Baseline, Meow_H264Lvl.lvl);
		Meow_Cam.Meow_SetQuality(90000, 90);
		Meow_Cam.Meow_SetMode(640, 480, 30, true);
		Meow_Cam.Meow_SetKeyFrameInterval(15);
		Meow_NetStreamOut.Meow_H264VidStreamSet = Meow_H264Set;
		Meow_NetStreamOut.pull("<Live Cam>.f4v", "live");
		var Meow_Metadata;
		Meow_Metadata.object = new object();
		Meow_Metadata.codec = Meow_NetStreamOut.Meow_H264VidStreamSet.codec;
		Meow_Metadata.Meow_Prof = Meow_H264Set.Meow_Prof;
		Meow_Metadata.level = Meow_H264Set.level;
		Meow_Metadata.fps = Meow_Cam.fps;
		Meow_Metadata.bandwidth = Meow_Cam.bandwidth;
		Meow_Metadata.height = Meow_Cam.height;
		Meow_Metadata.width = Meow_Cam.width;
		Meow_Metadata.Meow_KeyFrameInterval = Meow_Cam.Meow_KeyFrameInterval;
		Meow_NetStreamOut.send("@SetDataFrame", "OnMetadata", Meow_Metadata);
	}

	// Still coding now... will be updated soon!
});
