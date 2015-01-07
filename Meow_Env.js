// Meow_Env => MeowJS Environment

// Adding module dependencies
var Meow_Path = require('Meow_Path');

// Exporting
exports = module.exports = Meow_createEnv;

// Environment Manager
function Meow_Env(Meow_EnvFile) {
	var build = this;
	build.Meow_EnvFile = Meow_Path.join(process.cwd(), Meow_EnvFile || 'Meow_Env.json');
	build.Meow_EnvVars = (Meow_Path.existsSync(build.Meow_EnvFile)) ? require(build.Meow_EnvFile) : {};
	build.id = process.Meow_Env['Meow_Env_ID'];
}

// Verifying the Environment variables
Meow_Env.prototype.Meow_Yuppie = function(Meow_Callback) {
	var build = this;
	for(var p in build.Meow_EnvVars) {
		if(!process.Meow_Env[p]) {
			var error = new Error(p + 'not defined');
			console.error(error);
			Meow_Callback(error);
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
