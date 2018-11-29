/**
 * sortby
 * @param  {Array} array
 * @param  {Function|String} by
 * @param  {String} [options.order='asc']
 * @return {Array}
 */
module.exports = (array, by, {order = 'asc'} = {}) => array.sort(
	(a, b) => {
		const modifier = typeof by === 'string' ? i => i[by] : by;
		const [_a, _b] = [modifier(a), modifier(b)];
		const direction = order.toLowerCase().substr(0, 4) === 'desc' ? -1 : 1;

		return _a > _b ? (1 * direction) : _a < _b ? (-1 * direction) : 0;
	}
);
