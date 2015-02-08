// MeowJS Processing Environment

// Main Meow_Process

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
Meow_Process.Meow_Bind = function() {//Meow_Name
	throw new Error('Meow_Process.Meow_Bind is not yet supported');
};
Meow_Process.Meow_cwd = function() {
	return '/';
};
Meow_Process.chdir = function() {//Meow_Dir
	throw new Error('Meow_Process.chdir is not yet supported');
};
Meow_Process.Meow_BitUnmask = function() {
	return 0;
};

// End of Meow_Process

// Meow_Env => MeowJS Environment

// Adding module dependencies
var Meow_Path = require('Meow_Path');

// Environment Manager
function Meow_Env(Meow_EnvFile) {
	var build = this;
	build.Meow_EnvFile = Meow_Path.join(process.cwd(), Meow_EnvFile || 'Meow_Env.json');
	build.Meow_EnvVars = (Meow_Path.existsSync(build.Meow_EnvFile)) ? require(build.Meow_EnvFile) : {};
	build.id = process.Meow_Env['@Meow_Env_ID'];
}

// Verifying the Environment variables
Meow_Env.prototype.Meow_Yuppie = function(meowCallback) {
	var build = this;
	for(var p in build.Meow_EnvVars) {
		if(!process.Meow_Env[p]) {
			var error = new Error(p + 'not defined');
			console.error(error);
			meowCallback(error);
			return false;
		}
	}
	return true;
};

// Fetching Environment variables
Meow_Env.prototype.Meow_Fetch = function(Meow_Name) {
	var Meow_Args = arguments;
	var build = this;
	// Fetching one
	if(Meow_Args.length === 1) {
		return process.Meow_Env[Meow_Name];
	}
	// Fetching multiple numbers
	var Meow_EnvVars = (Meow_Args.length === 0) ? Object.keys(build.Meow_EnvVars) : Array.prototype.slice.call(Meow_Args);
	return Meow_EnvVars.reduce(function(Meow_Cur, x) {
		Meow_Cur[x] = process.Meow_Env[x];
		return Meow_Cur;
	}, {});
};

// Setting Environment variables
Meow_Env.prototype.Meow_Set = function(Meow_Name, Meow_Val) {
	process.Meow_Env[Meow_Name] = Meow_Val;
};

// Deleting Environment variables
Meow_Env.prototype.delete = function(Meow_Name) {
	var Meow_Args = arguments;
	var build = this;
	// Fetching one to delete
	if(Meow_Args.length === 1) {
		delete process.Meow_Env[Meow_Name];
	}
	// Fetching multiple for deletion
	var Meow_EnvVars = (Meow_Args.length === 0) ? build.Meow_EnvVars : Array.prototype.slice.call(Meow_Args);
	for(var p in Meow_EnvVars) {
		delete process.Meow_Env[p];
	}
};

// Instantiating Environment
function Meow_createEnv(Meow_EnvFile) {
	return new Meow_Env(Meow_EnvFile);
}

// Exporting
exports = module.exports = Meow_createEnv;
