const assignArray = require('../assignArray');

/**
 * Assign members of second array to first
 * @private
 * @param {Set} target	Target array to assign to
 * @param {Set} source	The set from which to assign respective values
 * no return value
 */
module.exports = function assignSet(target, source) {
	const array = Array.from(target);
	assignArray(array, Array.from(source));

	target.clear();
	array.forEach(
		item => target.add(item)
	);
};
