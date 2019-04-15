/**
 * Create a bound caller function
 * @param  {Object} source Object with the functionality
 * @param  {String} fn     Function name
 * @return {Function}
 */
module.exports = (source, fn) => source[fn].call.bind(source[fn]);
