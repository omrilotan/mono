/**
 * Get the package version corresponding with "latest" tag
 * @param  {String} name Name of the package
 * @return {String}      Version
 */
module.exports = async function getLatest (name) {
	const {promisify} = require('util');
	const npm = await promisify(require('npm').load)();
	const result = await promisify(npm.view)(`${name}@latest`, 'version');
	const latest = Object.values(result).shift();

	if (!latest) {
		throw new Error(`Could not find a latest tag in for package "${name}"`);
	}

	return latest.version;
};
