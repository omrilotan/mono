const assignable = require('../assignable');

/**
 * Assign members of second array to first
 * @private
 * @param {Set} target	Target array to assign to
 * @param {Set} source	The set from which to assign respective values
 * no return value
 */
module.exports = (target, source) => source.forEach(
	(item, index) => assignable(target[index]) && assignable(item)
		?
		require('../assign')(target[index], item)
		:
		target.add(item)
);
