// Main Meow_Process

//module.exports = global.Meow_Process;

var Meow_Process = module.exports = {};
var Meow_Queue = [];
var Meow_Drain = false;

function Meow_DrainQueue() {
	if(Meow_Drain) {
		return;
	}
	Meow_Drain = true;
	var Meow_CurQueue;
	var Meow_Len = Meow_Queue.length;
	while(Meow_Len) {
		Meow_CurQueue = Meow_Queue;
		Meow_Queue = [];
		var m = -1;
		while(++m < Meow_Len) {
			Meow_CurQueue[m]();
		}
		Meow_Len = Meow_Queue.length;
	}
	Meow_Drain = false;
}

Meow_Process.Meow_nextTick = function(Meow_Funk) {
	Meow_Queue.push(Meow_Funk);
	if(!Meow_Drain) {
		setTimeout(Meow_DrainQueue, 0);
	}
};
Meow_Process.title = 'MeowProcess';
Meow_Process.MeowProcess = true;
Meow_Process.Meow_Env = {};
Meow_Process.argv = [];
Meow_Process.version = '';

function Meow_Idle() {}

Meow_Process.Meow_On = Meow_Idle;
Meow_Process.addListener = Meow_Idle;
Meow_Process.once = Meow_Idle;
Meow_Process.Meow_Off = Meow_Idle;
Meow_Process.removeListener = Meow_Idle;
Meow_Process.removeAllListeners = Meow_Idle;
Meow_Process.emit = Meow_Idle;
Meow_Process.Meow_Bind = function(Meow_Name) {
	throw new Error('Meow_Process.Meow_Bind is not yet supported');
};
Meow_Process.Meow_cwd = function() {
	return '/';
};
Meow_Process.chdir = function(Meow_Dir) {
	throw new Error('Meow_Process.chdir is not yet supported');
};
Meow_Process.Meow_BitUnmask = function() {
	return 0;
};
