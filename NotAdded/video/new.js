var define;
define(['meta', 'p2p', 'util'], function (z, meta, p2p, util) {
	var xConsole = z('#xConsole');
	var feature = ['JSON',
	'WebSocket',
	'URL',
	'Worker',
	'ArrayBuffer',
	'Uint8Array',
	'File',
	'Blob',
	'reqSysFile',
	'FireError',
	'RTCPeerConnection',
	'RTCIceCandidate',
	'RTCSessionDescription'];
	var misfeature = false;
	var x, window;
	x.each(feature, function (f) {
		if(!window[f]) {
			misfeature = true;
			xConsole.append('<li><span class=error>Need Feature: '+f+'</span>');
		}
	});
	if(misfeature) { return; }
	var client = new p2p.client();
	xConsole.append('<li>WebSocket connecting.....');
	client.onReady = function() {
		xConsole.append('<li>Connected. Get PeerID '+client.peerID);
		xConsole.append('<li>Select a file to share: <input type=file id=xFile />');
		z('#xFile').on('change', function (xEvent) {
			z('#xFile').attr('disabled', true);
			var file = xEvent.target.files[0];
			xConsole.append('size: '+util.formatSize(file.size)+' ('+file.type+')');
			var builder = meta.build(file);
			builder.onLoad = function(result) {
				z('xHash').text(result.hash);
				xConsole.append('<li>Sending meta.....');
				client.neww(result);
			};
			builder.onProgress = function(data) {
				z('#xHash').text(''+(data.done / data.total * 100).toFixed(2) + '%');
			};
			xConsole.append('<li>Calculating xx hash: <span id=xHash>0%</span>');
			client.onMeta = function(meta) {
				client.file.write(file, 0, function (xEvent) {
					client.pieceQueue = [];
					client.finishedPiece = x.map(client.finishedPiece, function() {
						return 1;
					});
					client.updateBitmap();
					xConsole.append('<li>Link created: <a href="/link/'+meta.hash+'" target=blank' + location.href.replace(/link\/new.*$/i, 'link/'+meta.hash)+'</a>');
					xConsole.append('<li><dl class=info>'+'<dt>strength</dt><dd id=xStrength>100%</dd>'+'<dt>peers</dt><dd id=xPeers>1</dd>'+'<dt>Connected</dt><dd id=xConnect>0</dd>'+'<dt>upload</dt><dd id=xUploads>0B/s</dd><dd id=xUpload>0B</dd>'+'<dt>download</dt><dd id=xDownloads>0B/s</dd><dd id=xDownload>0B</dd>'+'</dl><button id=xRefreshPeerList>refresh</button>');

					//
					// Still more to code
					//
				});
			};
		});
	};
});
