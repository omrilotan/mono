/**
 * sortby
 * @param  {Array} array
 * @param  {Function|String} by
 * @param  {String} [options.order='asc']
 * @param  {String} [options.modify=a=>a]
 * @return {Array}
 */
module.exports = (array, by, { order = 'asc', modify = a => a } = {}) => array.sort(
	function sorter(a, b) {
		const selector = typeof by === 'string' ? i => i[by] : by;
		const [ _a, _b ] = [ a, b ].map(selector).map(modify);
		const direction = order.toLowerCase().substr(0, 4) === 'desc' ? -1 : 1;

		return _a > _b ? (1 * direction) : _a < _b ? (-1 * direction) : 0;
	},
);
