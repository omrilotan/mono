const { promisify } = require('util');

/**
 * Check if a package or a tag of a package exists in the registry
 * @param  {String} module         Module name
 * @param  {String} [tag='latest'] Tag
 * @return {Boolean}
 */
module.exports = async function getVersion(module, tag = 'latest') {
	try {
		const results = await promisify(this.view)([ module, tag ].join('@'), 'version');
		const version = Object.values(results).shift();

		return version && version.version;
	} catch (error) {
		return false;
	}
};
