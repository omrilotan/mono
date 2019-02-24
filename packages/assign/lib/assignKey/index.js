const assignable = require('../assignable');
const clone = require('../clone');

/**
 * assign one key from one object to the target
 * @private
 * @param {Object} target Target object to assign to
 * @param {Object} source The object to assign value
 * @param {String|Symbol} key
 * no return value
 */
module.exports = function assignKey(target, source, key) {
	const easyAssign = !target.hasOwnProperty(key) || !assignable(source[key]);

	target[key] = easyAssign ? source[key] : require('../assign')(
		clone(target[key]),
		source[key]
	);
};
