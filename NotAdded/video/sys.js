function sysFile(size, callback) {
	// fs => file system
	// fe => file entry
	var ig = this;
	var x;
	ig.size = size;
	ig.callback = callback;
	ig.filename = x.ID('file'+(new Date()).getTime()+'_'+x.random(3721));
	ig.fs = null;
	ig.fe = null;
	ig.init();
}

//
// Still more to code
//
