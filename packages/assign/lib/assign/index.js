const assignArray = require('../assignArray');
const assignKeys = require('../assignKeys');
const assignSymbols = require('../assignSymbols');

/**
 * Delegate to assign keys and symbols
 * @private
 * @param  {Object} target Target object to assign to
 * @param  {Object} source The object from which to assign respective values
 * @return {Object} Original to, assigned
 */
module.exports = function assign(target, source) {
	if (Array.isArray(target) && Array.isArray(source)) {
		assignArray(target, source);
		return target;
	}

	target = Object(target);
	source = Object(source);

	assignKeys(target, source);
	assignSymbols(target, source);

	return target;
}
