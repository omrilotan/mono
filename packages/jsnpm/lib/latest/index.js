const {promisify} = require('util');

/**
 * Get the package version corresponding with "latest" tag
 * @param  {String} name Name of the package
 * @return {String}      Version
 */
module.exports = async function latest(name) {
	const result = await promisify(this.view)(`${name}@latest`, 'version');
	const latest = Object.values(result).shift();

	if (!latest) {
		throw new Error(`Could not find a latest tag in for package "${name}"`);
	}

	return latest.version;
}
