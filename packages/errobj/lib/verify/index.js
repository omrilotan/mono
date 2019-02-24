/**
 * Throws an error unless it accepts an error
 * @param  {Error} error
 * @return {undefined}
 */
module.exports = function verify(error) {
	if (!(error instanceof Error)) {
		throw new RangeError(`Expected an error. Insead got ${typeof error}: ${error}`);
	}
};
