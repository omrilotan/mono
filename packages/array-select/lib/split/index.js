/**
 * Split array into two arrays by a condition. [True, False]
 * @param  {Array} array
 * @param  {Function} test
 * @return {Array[]}
 */
module.exports = (array, test) => array.reduce(
	([truths, falses], item, ...rest) => test(item, ...rest)
		? [truths.concat([item]), falses]
		: [truths, falses.concat([item])]
	,
	[[], []]
);
