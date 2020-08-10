const { promisify } = require('util');

module.exports = async function exists(field, value) {
	try {
		await promisify(this.config.set)(field, value);
		return true;
	} catch (error) {
		return false;
	}
};
