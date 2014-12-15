var MeowAudio = (function() {
	var Meow_ShowPushedVid, Meow_AddKitty, Meow_Vid, Meow_NetStatEvent, Meow_Power, MeowTrace, Meow_Event, Meow_H264Prof;
	var Meow_NetConnect, Meow_NetConnect1;
	var Meow_NetStreamIn, Meow_NetStreamOut, Meow_NetStream;
	Meow_Cam = Meow_Cam.Meow_FetchCam();
	Meow_Microphone = Meow_Microphone.Meow_FetchMicrophone();
	var Meow_VideoIn;
	var Meow_VideoOut;
	var Meow_TextField;
	var Meow_Metatext, Meow_DescpIn, Meow_DescpOut, Meow_MetatextTitle, Meow_Cam, Meow_Microphone;
	Meow_Metatext.Meow_TextField = new Meow_TextField();
	Meow_DescpIn.Meow_TextField = new Meow_TextField();
	Meow_DescpOut.Meow_TextField = new Meow_TextField();
	Meow_MetatextTitle.Meow_TextField = new Meow_TextField();
	function Meow_H264Encode() {
		new Meow_InitConnect();
	}
	function Meow_InitConnect()
	{
		Meow_NetConnect1 = new Meow_NetConnect();
		Meow_NetConnect1.addEventListener(Meow_NetStatEvent.Meow_NetStat, Meow_OnNetStat);
		Meow_NetConnect1.Meow_Connect(" ");
		Meow_NetConnect1.Meow_Client = Meow_Power;
	}
	function Meow_OnNetStat(Meow_NetStatEvent) {
		new MeowTrace(Meow_Event.info.code);
		if(Meow_Event.info.code === "Meow_NetConnect.Meow_Connect.Success") {
			new Meow_PushCam();
			new Meow_ShowPushedVid();
			new Meow_ShowPlaybackVid();
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
		Meow_Metadata.Object = new object();
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
	function ShowPulledVid() {
		Meow_VideoOut = new Meow_Vid();
		Meow_VideoOut.x = 0;
		Meow_VideoOut.y = 10;
		Meow_VideoOut.width = Meow_Cam.width;
		Meow_VideoOut.height = Meow_Cam.height;
		Meow_VideoOut.Meow_PushCam(Meow_Cam);
		Meow_AddKitty(Meow_VideoOut);
		Meow_Metatext.x = 0;
		Meow_Metatext.y = 630;
		Meow_Metatext.width = 1280;
		Meow_Metatext.height = 240;
		Meow_Metatext.background = true;
		Meow_Metatext.backgroundColor = 0X1F1F1F;
		Meow_Metatext.textColor = 0XD9D9D9;
		Meow_Metatext.border = true;
		Meow_Metatext.borderColor = 0XDD7500;
		Meow_AddKitty(Meow_Metatext);
		Meow_MetatextTitle.text = "\n -- Encoding Settings --";
		style = Meow_TextFormat = new Meow_TextFormat();
		style.size = 18;
		Meow_MetatextTitle.Meow_setTextFormat(style);
		Meow_MetatextTitle.textColor = 0XDD7500;
		Meow_MetatextTitle.width = 1280;
		Meow_MetatextTitle.y = 580;
		Meow_MetatextTitle.height = 50;
		Meow_MetatextTitle.background = true;
		Meow_MetatextTitle.backgroundColor = 0X1F1F1F;
		Meow_MetatextTitle.border = true;
		Meow_MetatextTitle.borderColor = 0XDD7500;
		Meow_DescpOutVid.text = "\n\n\n\n";
		Meow_DescpOutVid.background = true;
		Meow_DescpOutVid.backgroundColor = 0X1F1F1F;
		Meow_DescpOutVid.textColor = 0XD9D9D9;
		Meow_DescpOutVid.x = 0;
		Meow_DescpOutVid.y = Meow_Cam.height;
		Meow_DescpOutVid.width = Meow_Cam.width;
		Meow_DescpOutVid.height = 100;
		Meow_DescpOutVid.border = true;
		Meow_DescpOutVid.borderColor = 0XDD7500;
		Meow_AddKitty(Meow_DescpOutVid);
		Meow_AddKitty(Meow_MetatextTitle);
	}
	function Meow_ShowPlaybackVid() {
		Meow_NetStreamIn = new Meow_NetStream(Meow_NetConnect1);
		Meow_NetStreamIn.Meow_Client = Meow_Power;
		Meow_NetStreamIn.play("<on-demand cam>.f4v");
		Meow_VideoIn = new Meow_Vid();
		Meow_VideoIn.x = Meow_VideoOut.x + Meow_VideoOut.width;
		Meow_VideoIn.y = Meow_VideoOut.y;
		Meow_VideoIn.width = Meow_Cam.width;
		Meow_VideoIn.height = Meow_VideoOut.height;
		Meow_VideoIn.Meow_PushNetStream(Meow_NetStreamIn);
		Meow_AddKitty(Meow_VideoIn);
		Meow_DescpInVid.text = "\n\n\n\n";
		Meow_DescpInVid.background = true;
		Meow_DescpInVid.backgroundColor = 0X1F1F1F;
		Meow_DescpInVid.textColor = 0XD9D9D9;
		Meow_DescpInVid.x = Meow_VideoIn.x;
		Meow_DescpInVid.y = Meow_Cam.height;
		Meow_DescpInVid.width = Meow_Cam.width;
		Meow_DescpInVid.height = 100;
		Meow_DescpInVid.border = true;
		Meow_DescpInVid.borderColor = 0XDD7500;
		Meow_AddKitty(Meow_DescpInVid);
	}
	function Meow_OnBandwidthFinish() {}
	function OnMetadata(object) {
		for(var Meow_Settings in object) {
			MeowTrace(Meow_Settings + " = " + object[Meow_Settings]);
			Meow_Metatext.text += "\n" + " " + Meow_Settings.toUpperCase() + " = " + object[Meow_Settings] + "\n";
		}
	}
});
