/**
 * Assign members of second array to first
 * @private
 * @param {Set} target	Target array to assign to
 * @param {Set} source	The set from which to assign respective values
 * no return value
 */
module.exports = (target, source) => {
	source.forEach(item => {
		target.add(item);
	});
};
