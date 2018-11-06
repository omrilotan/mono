const assignable = require('../assignable');

/**
 * Assign members of second array to first
 * @private
 * @param {Array} target	Target array to assign to
 * @param {Array} source	The array from which to assign respective values
 * no return value
 */
module.exports = (target, source) => source.forEach(
	(item, index) => assignable(target[index]) && assignable(item)
		?
		require('../assign')(target[index], item)
		:
		target.push(item)
);
