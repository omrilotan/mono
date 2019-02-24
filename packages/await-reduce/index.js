/**
 * @typedef Reducer
 * @type {Function}
 * @description Function to execute on each element in the array, taking four arguments
 * @param {Any}    accumulator The accumulator accumulates the callback's return values
 * @param {Any}    value       The current element being processed in the array.
 * @param {Number} index       The index of the current element being processed in the array. Starts at index 0, if an initial value is provided, and at index 1 otherwise.
 * @param {Array}	array The array reduce() was called upon.
 */

/**
 * [reduce description]
 * @param  {Array}	 array
 * @param  {Reducer} reducer
 * @param  {Any}	 initial Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce() on an empty array without an initial value is an error.
 * @return {Any}
 */
module.exports = async function reduce(array, reducer, initial) {
	if (!Array.isArray(array)) {
		throw new TypeError(`reduce function expects first argument to be an array. instead got ${typeof array}`);
	}

	const results = await Promise.all(array);
	const provided = typeof initial !== 'undefined';
	let index = provided ? 0 : 1;
	let accumulator = provided ? initial : results[0];

	while (index < results.length) {
		const value = results[index];
		accumulator = await reducer(accumulator, value, index, results);
		index++;
	}

	return accumulator;
};
