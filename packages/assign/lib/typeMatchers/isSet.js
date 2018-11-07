/**
 * Checks whether a given argument is of data type Map
 * @param item
 * @returns {boolean}
 */

module.exports = item => item instanceof Set || (item && typeof item.toString === 'function' && item.toString() === '[object Set]');
