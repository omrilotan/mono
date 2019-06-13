const distribute = require('./lib/distribute');
const split = require('./lib/split');

/**
 * array-select Extract items from one array into two or more arrays by results of a provided function
 * @param  {Array}           array
 * @param  {...Function} ...reducers
 * @return {Array[]}
 */
module.exports = function arraySelect(array, ...reducers) {
	if (!Array.isArray(array)) {
		throw new TypeError(`array-select expected first argument to be an array, instead got ${array}`);
	}

	switch (reducers.length) {
		case 0:
			throw new Error('array-select could not find any filtering function');
		case 1:
			return split(array, ...reducers);
		default:
			return distribute(array, ...reducers);
	}
};
