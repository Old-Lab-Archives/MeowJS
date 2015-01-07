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

	//
	// Still more to code!
	//
}
