const { readFile } = require('../fs-async');

/**
 * Get package.json's data
 * @return {Promise} resolve accepts the data object
 */
module.exports.packageData = async function packageData() {
	const json = await readFile('package.json');

	return JSON.parse(json.toString());
};
