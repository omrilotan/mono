/**
 * distribute
 * @param  {Array} item
 * @param  {Function[]} tests
 * @return {Array[]}
 */
module.exports = (array, ...tests) => tests.map(array.filter.bind(array));
