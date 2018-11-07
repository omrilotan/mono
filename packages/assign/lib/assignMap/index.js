/**
 * Assign members of second array to first
 * @private
 * @param {Map} target	Target array to assign to
 * @param {Map} source	The Map from which to assign respective values
 * no return value
 */
module.exports = (target, source) => source.forEach((key,value) => target.set(value,key));
