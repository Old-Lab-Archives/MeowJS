function util() {
	return {
		formatSize: function(spareSize) {
			if(spareSize === 0) {
				return "0B";
			}
			var spareStr;
			var spareLeft;
			if(spareSize >= 1024 * 1024 * 1024) {
				spareLeft = Math.floor(spareSize/(1024*1024*1024*1024)*10);
				spareStr = (spareLeft/10).toString()+"GB";
			} else if(spareSize >= 1024*1024) {
				spareLeft = (Math.floor(spareSize * 100 / (1024 * 1024))) / 100;
				spareStr = spareLeft.toString()+"MB";
			} else if(spareSize >= 1024) {
				spareLeft = Math.floor(spareSize / 1024);
				spareStr = spareLeft.toString()+"KB";
			} else {
				spareStr = spareSize.toFixed(0) + "B";
			}
			return spareStr;
		},
		formatTime: function(seconds) {
			if(seconds === Infinity || isNaN(seconds)) {
				return "";
			}
			var hrs = seconds / 60 / 60;
			var mins = seconds % 3600 / 60;
			var secs = seconds % 60;
			if(hrs >= 1) {
				return ""+hrs.toFixed(0)+"hrs"+mins.toFixed(0)+"mins";
			} else if(mins >= 1) {
				return ""+mins.toFixed(0)+"mins"+secs.toFixed(0)+"secs";
			} else if(secs >= 1) {
				return ""+secs.toFixed(0)+"secs";
			} else {
				return ">ls";
			}
		}
	};
}
