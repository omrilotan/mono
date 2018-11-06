/**
 * Create a shallow clone of a given Object or Array
 * @private
 * @param  {Object|Array} instance Object or Array to clone
 * @return {Object|Array} (respectively) a shallow clone
 */
module.exports = instance => Array.isArray(instance) ? instance.slice(0) : Object.assign({}, instance);
