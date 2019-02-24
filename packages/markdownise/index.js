const table = require('./lib/table');

/**
 * Create markdown representation of data structures
 * @param  {Any} data
 * @return {String}
 */
module.exports = data => {
	if (Array.isArray(data)) {
		if (typeof data[0] === 'object') {
			return table(data);
		}
	}

	return '';
};

