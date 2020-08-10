const { promisify } = require('util');

module.exports = async function versions(module) {
	const result = await promisify(this.view)(module, 'versions');

	return Object.values(result).shift().versions;
};
