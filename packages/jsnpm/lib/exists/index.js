const {promisify} = require('util');

module.exports = async function exists(module) {
	try {
		await promisify(this.view)(module, 'name');
		return true;
	} catch (error) {
		return false;
	}
};
