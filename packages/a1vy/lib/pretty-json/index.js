/**
 * If the string is JSON, print it nicely
 * @param  {String} json Possibly JSON
 * @return {String}
 */
module.exports = data => {
	if (!data.includes('{')) {
		return data;
	}

	try {
		return JSON.stringify(JSON.parse(data), null, 4);
	} catch (error) {
		return data;
	}
}
