const OBJECT_TYPES = ['object', 'function'];
const NULL_VALUES = [undefined, null];

/**
 * Checks this object is an assignable object
 * @private
 * @param  {Object} target
 * @return {Boolean} is this object "assignable"
 */
module.exports = target => OBJECT_TYPES.includes(typeof target) && !NULL_VALUES.includes(target);
