/**
 * Resolve dot notation strings
 *
 * @param  {Object} context     Object to start notation search (defaults to global scope)
 * @param  {String} [string=''] Dot notation representation
 * @return {Any}				Whatever it finds / undefined
 *
 * @example
 * const obj = {
 *   top_level: {
 *     nested: {
 *       value: 'My Value'
 *     }
 *   }
 * };
 *
 * notate(obj, 'top_level.nested.value');
 * // 'My Value'
 *
 * notate(obj, 'top_level.missing.value');
 * // undefined
 */
module.exports = (source, string = '') => string
	.split('.')
	.reduce(
		(previous, current) => typeof previous === 'object' ? previous[current] : previous,
		source
	);
