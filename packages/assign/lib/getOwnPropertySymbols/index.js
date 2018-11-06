/**
 * Perform getOwnPropertySymbols when available
 * @private
 * @param  {Object} object
 * @return {Array} List of symbol keys (falls back to an empty array)
 */
module.exports = object => Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
