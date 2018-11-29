/**
 * Calculate one part's percentage of the whole
 * @param  {Number} part
 * @param  {Number} whole
 * @return {Number}
 */
module.exports = (part, whole) => {
	if (part === 0 || whole === 0) {
		return part === whole ? 0 : part > whole ? 100 : 0;
	}

	return Math.round((part / whole) * 100);
};
