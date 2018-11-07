/**
 * Create a shallow clone of a given Object or Array
 * @private
 * @param  {Object|Array|Set|Map} instance Object or Array or Set or Map to clone
 * @return {Object|Array|Set|Map} (respectively) a shallow clone
 */
module.exports = function clone(instance) {
	if (Array.isArray(instance)) {
		return instance.slice(0);
	} else if (instance instanceof Set) {
		return new Set(instance);
	} else if (instance instanceof Map) {
		return new Map(instance);
	}

	return Object.assign({}, instance);
}
