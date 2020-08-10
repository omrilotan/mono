const { sep } = require('path');

/**
 * node modules directory name
 * @type {String}
 */
const MODULES_DIRNAME = 'node_modules';

/**
 * Webpack "externals" entry pattern
 * @example 'external "module-name"'
 * @type {RegExp}
 */
const EXTERNAL_PATTERN = /^external /;

/**
 * Output name for "external" entries
 * @type {String}
 */
const LITERNAL_NAME_EXTERNAL = 'external';

/**
 * Output name for parent component
 * @type {String}
 */
const LITERNAL_NAME_SELF = 'self';

/**
 * Clean name from pre defined patterns:
 *  - (.*!): Extract filename from loaders: '(<loader expression>!)?/path/to/module.js'
 *  - (\s.*): Avoid omitted modules: './src/lib/index.js + 4 modules'
 * @param  {String} name
 * @return {String}
 */
const clean = name => name.replace(/.*!|\s.*/, '');

// Org module name consists of two parts: '@org-name/module-name'
/**
 * [description]
 * @param  {String} string
 * @return {Boolean}
 */
const org = string => string.startsWith('@');

/**
 * Get the module name from the module path
 * @param  {String} name
 * @return {String}
 */
module.exports = name => {
	if (EXTERNAL_PATTERN.test(name)) {
		return LITERNAL_NAME_EXTERNAL;
	}

	name = clean(name);

	const parts = name.split(sep);
	const a = parts.findIndex(item => item === MODULES_DIRNAME) + 1;

	return a
		?
		parts.slice(a, a + (org(parts[a]) ? 2 : 1)).join(sep)
		:
		LITERNAL_NAME_SELF
	;
};
