/**
 * @module jsonCopy
 */

/**
 * Copies using JSON functionalities. Very performant, not a comprehensive copyier
 * @param  {Object} data
 * @return {Object} Deep copy
 */
module.exports.jsonCopy = function jsonCopy(data) {
	try {
		return JSON.parse(JSON.stringify(data));
	} catch (error) {
		throw new SyntaxError(`Data was expected to be valid for JSON. Got error: ${error}`);
	}
};
