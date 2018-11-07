const OBJECT_TYPES = ['object', 'function'];

/**
 * Checks this object is an assignable object
 * @private
 * @param  {Object} target
 * @return {Boolean} is this object "assignable"
 */
module.exports = target => OBJECT_TYPES.includes(typeof target) && target !== null;
