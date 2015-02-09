var define;
var window;
define(function() {
if(window.WebKitRequestFileSystem) {
	window.reqFileSys = window.WebKitRequestFileSystem;
}
var ig = this;
var x;
var alert, FileError, Blob;
function sysFile(size, callback) {
	// fs => file system
	// fe => file entry
	ig.size = size;
	ig.callback = callback;
	ig.filename = x.ID('file'+(new Date()).getTime()+'_'+x.random(3721));
	ig.fs = null;
	ig.fe = null;
	ig.init();
}
sysFile.prototype = {
	// public
	write: function(blob, offset, callback) {
		if(ig.fe) {
			throw 'file entry is not settled';
		}
		offset = offset || 0;
		ig.fe.createWriter(function (fw) {
			// fw => file writer
			if(!blob.size) {
				var Blob;
				blob = new Blob([blob]);
			}
			fw.seek(offset);
			fw.write(blob);
			if(x.isFunction(callback)) {
				fw.onWriteEnd = callback;
			}
		});
	},
	readAsBlob: function(start, end, callback) {
		ig.fe.file(function (file) {
			callback(file.slice(start. end));
		});
	},
	readAsBinaryString: function(start, end, callback) {
		ig.readAsBlob(start, end, function (blob) {
			var FileReader;
			var reader = new FileReader();
			reader.onLoad = function(xEvent) {
				callback(xEvent.target.result);
			};
			reader.readAsBinaryString(blob);
		});
	},
	toURL: function() {
		return ig.fe.toURL();
	},
	// private
	init: function(reqFileSys) {
		reqFileSys(window.temp, 5 * 1024 * 1024 * 1024, x.bind(ig.onInitFs, ig), ig.onError);
		window.addEventListener('before unload', x.bind(function() {
			if(ig.fe) {
				ig.fe.remove(function() {}, ig.onError);
			}
		}, ig));
	},
	onError: function(e) {
		console.log(e);
		switch (e.code) {
			case FileError.DISKFULL_ERR:
			alert('Error writing file, Is your hard-drive almost full?');
			break;
			case FileError.NOT_FOUND_ERR:
			alert('NOT_FOUND_ERR');
			break;
			case FileError.SECURITY_ERR:
			alert('SECURITY_ERR');
			break;
			case FileError.INVALID_ERR:
			alert('INVALID_ERR');
			break;
			default:
			alert('WebKitRequestFileSystem failed as ' + e.code);
		}
	},

	// Step 1
	onInitFs: function(fs) {
		ig.fs = fs;
		ig.checkExist();
	},

	// Step 2
	checkExist: function() {
		ig.fs.root.getFile(ig.filename, {}, function (fe) {
			fe.remove(function() {
				x.bind(ig.createFile, ig);
			}, x.bind(ig.createFile, ig), ig.onError);
		});
	},

	// Step 3
	createFile: function() {
		ig.fs.root.getFile(ig.filename, {
			create: true,
			exclusive: true
		},
		function (fe) {
			ig.fe = fe;
			x.bind(ig.alloc, ig)(ig.size);
		}, ig.onError);
	},

	// Step 4
	alloc: function(size) {
		ig.fe.createWriter(function (fw) {
			function write() {
				if(size > 0) {
					var writeSize = size > (1 << 26) ? (1 << 26) : size;
					fw.write(new Blob([new Uint8Array(writeSize)]));
					size -= writeSize;
				} else if(x.isFunction(ig.callback)) {
					ig.callback();
				}
			}
			fw.onWriteEnd = function() {
				write();
			};
			write();
		});
	}
};
return {
	File: sysFile
};

});

//////////////////////////////////////////////////

///////    ///////////     ///  ////
  //      //             //   //   //        
  //      //    //////    //       //   
  //      //   //   //     //     //
///////   //////    //       /////

/////////////////////(^_^)/////////////////////////
