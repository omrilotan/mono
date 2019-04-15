/**
 * Compose a string representation of the object
 * @param  {Object}   target
 * @param  {String}   [key_value_delimiter=':']
 * @param  {String}   [list_delimiter=',']
 * @param  {Function} [filter=()=>true]
 * @return {String}
 */
module.exports = (target, key_value_delimiter = ':', list_delimiter, filter = () => true) =>
	Object.entries(target)
		.filter(filter)
		.map(
			entry => entry.map(i => `${i}`).join(key_value_delimiter)
		)
		.join(list_delimiter);
