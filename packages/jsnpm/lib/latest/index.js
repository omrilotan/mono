const getVersion = require('../getVersion');

/**
 * Get the package version corresponding with "latest" tag
 * @param  {String} name Name of the package
 * @return {String}      Version
 */
module.exports = async function latest(name) {
	const latest = await getVersion.call(this, name, 'latest');

	if (!latest) {
		throw new Error(`Could not find a latest tag in for package "${name}"`);
	}

	return latest;
};
