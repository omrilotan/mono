/**
 * Wrap a string from both sides
 * @param  {String} string
 * @param  {String} [before='']
 * @param  {String} [after]
 * @return {String}
 */
module.exports = (string, before = '', after = before) => [before, string, after].join('');
