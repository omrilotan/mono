/**
 * If the string is JSON, print it nicely
 * @param  {String} json Possibly JSON
 * @return {String}
 */
module.exports = data => {
	try {
		return JSON.stringify(JSON.parse(data), null, 2);
	} catch (error) {
		return data;
	}
};
