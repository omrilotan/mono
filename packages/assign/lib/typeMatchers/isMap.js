/**
 * Checks whether a given argument is of data type Set
 * @param item
 * @returns {boolean}
 */

module.exports = item => item instanceof Map || (item && typeof item.toString === 'function' && item.toString() === '[object Map]');
