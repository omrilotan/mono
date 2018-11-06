const assignKey = require('../assignKey');
const getOwnPropertySymbols = require('../getOwnPropertySymbols');

/**
 * Assign second object symbols to first
 * @private
 * @param {Object} target Target object to assign to
 * @param {Object} source The object from which to assign respective values
 * no return value
 */
module.exports = (target, source) => getOwnPropertySymbols(source)
	.forEach(symbol => assignKey(target, source, symbol));
