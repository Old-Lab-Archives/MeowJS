/*
meta(function(x, xx) {

	// Value is set, since crash might occur if more uses it.
	var WorkerCount = 4;

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
		//
		// Still more to code
		//
		}
	};
});
*/
