// states
var isMeowFrameReady = false;

// variables
var meowNotifyBundle;

// inner frame 
var meowInnerFrames;

// init
meowExternalFrames(); // loads

// declarations
var window, document;
var meowNotifyBundle;
var meowNotifyClient;
var meowStorage;
var meowLocalStorage;

// initializaes and called on load page
function meowExternalFrames(message) {
	if(typeof (meowStorage) !== "undefined") {
		// if there is local storage support
		meowNotifyBundle = meowLocalStorage.meowNotifyBundle;
		message = {
			message: "loaded externally"
		};
		meowNotifyClient();
	} else {
		// if not.. then
		message = {
			error: "Fatal error (O_O) -- no meowLocalStorage support"
		};
		meowNotifyClient(message);
	}
}

// Initialization of inner frames called by the client app after the external page (meowExternalFrames) gets loaded.
function meowInnerFrames(meowNotifyBundle, meowID) {
	// meowID => An unique login URL => Location of the meowInnerFrames
	// loading inner frames
	var kiddo = document.createElement('iframe');
	kiddo.src = "https://" + meowID;
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(kiddo);
}

// Cross (Native) message receiver
window.onMessage = function(message) {
	if(message.data === 'ready') {
		
		// iframe loaded
		meowInnerFrames = document.getElementsByTagName('iframe')[0];
		
		// notifying client-side
		//meowNotifyInnerClient();
	} else {
		// JSON parsing
		var data = JSON.parse(message.data); // data handling
	}
};

// When the meowInnerFrames and meowExternalFrames are ready, then "client app" is notified
// client calls meowExternalFrames() method as a reponse
function meowNotifyClient(message) {
	var iframe = document.createElement("IFRAME");
	iframe.setAttribute("src", "js-frame: meowNotifyClient:" +message);
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;
}
