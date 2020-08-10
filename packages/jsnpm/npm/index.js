const { promisify } = require('util');
const load = promisify(require('npm').load);

let instance;
module.exports = async function npm() {
	if (instance && instance.constructor.name === 'EventEmitter') {
		return instance;
	}

	return instance = load();
};
