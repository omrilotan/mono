const assignKey = require('../assignKey');

/**
 * Assign second object keys to first
 * @private
 * @param {Object} target Target object to assign to
 * @param {Object} source The object from which to assign respective values
 * no return value
 */
module.exports = (target, source) => Object.keys(source)
	.forEach(key => assignKey(target, source, key));
