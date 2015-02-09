var meta;
meta(function(x, xx) {

	// Value is set, since crash might occur if more uses it.
	var WorkerCount = 4;

	var xBuild = this;
	return {
		xPieceSize: function(fileSize) {
			var pSize = 1 << 20;
			while(fileSize / pSize > 128) {
				pSize <<= 1;
			}
			return pSize;
		},

		xBlockSize: function(pieceSize) {
			var bSize = pieceSize;
			while(bSize > 1 << 23) {
				bSize >>= 1;
			}
			return bSize;
		},

		xCalculateHash: function(builder) {
			var m;
			var window;
			var workers = [];
			var file = builder.file;
			var pieceSize = builder.result.pieceSize;
			var totalPieces = builder.result.PieceCount;
			var array = [];
			var checkFinished = x.throttle(function() {
				var done = x.filter(array, x.isString).length;
				if(x.isFunction(builder.onProgress)) {
					builder.onProgress({
						done: done,
						total: totalPieces
					});
				}
				if(done === totalPieces) {
					builder.result.hash = xx.hash(array.join(''));
					builder.result.array = array;
					if(x.isFunction(builder.onLoad) && !builder.onLoadx1) {
						builder.onLoadx1 = true;
						builder.onLoad(builder.result);
					}
				}
			}, 100);
			var Worker = new Worker('xxWorker.js');
			Worker.onMessage = function(xEvent) {
				array[xEvent.data.id] = xEvent.data.hash;
				checkFinished();
				window.URL.revokeObjectURL(xEvent.data.blob);
			};
			for(m = 0; m < WorkerCount; ++m) {
				workers.push(Worker);
			}
			for(m = 0; m < totalPieces; ++m) {
				var blob = file.slice(pieceSize * m, pieceSize * (m + 1));
				var blobUrl = window.URL.createObjectURL(blob);
				workers[m % WorkerCount].postMessage(x.clone({
					id: m,
					blob: blobUrl
				}));
			}
		},

		build: function(file) {
			var fileSize = file.size;
			var pieceSize = xBuild.xPieceSize(fileSize);
			var blockSize = xBuild.xBlockSize(pieceSize);
			var result = {
				fileName: file.name,
				type: file.size,
				pieceSize: pieceSize,
				PieceCount: Math.ceil(1.0 * fileSize / pieceSize),
				blockSize: blockSize
			};
			var builder = {
				'file': file,
				'result': result
			};
			xBuild.xCalculateHash(builder);
			return builder;
		}
	};
});
