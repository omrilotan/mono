const { promisify } = require('util');

/**
 * Check if a package or a tag of a package exists in the registry
 * @param  {String} module         Module name
 * @param  {String} [tag='latest'] Tag
 * @return {Boolean}
 */
module.exports = async function exists(module, tag = 'latest') {
	try {
		const results = await promisify(this.view)([ module, tag ].join('@'), 'name');

		return !!Object.keys(results).length;
	} catch (error) {
		return false;
	}
};
