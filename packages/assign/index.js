/**
 * @module assign
 */

/**
 * Checks this object is an assignable object
 * @private
 * @param  {Object} target
 * @return {Boolean} is this object "assignable"
 */
const assignable = (target) => isObject(target) && ![undefined, null].includes(target);

/**
 * Checks a target is an object, excludes null
 * @private
 * @param  {Any} target [description]
 * @return {Boolean} Is the target an object
 */
const isObject = (target) => ['object', 'function'].includes(typeof target) && target !== null;

/**
 * Delegate to assign keys and symbols
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object from which to assign respective values
 * @return {Object} Original to, assigned
 */
function assign(to, from) {
    if (Array.isArray(to) && Array.isArray(from)) {
        assignArray(to, from);
        return to;
    }

    to = Object(to);
    from = Object(from);

    assignKeys(to, from);
    assignSymbols(to, from);

    return to;
}

/**
 * Assign second object keys to first
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object from which to assign respective values
 * no return value
 */
const assignKeys = (to, from) => Object.keys(from)
    .forEach((key) => assignKey(to, from, key));

/**
 * Assign second object symbols to first
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object from which to assign respective values
 * no return value
 */
const assignSymbols = (to, from) => getOwnPropertySymbols(from)
    .forEach((symbol) => assignKey(to, from, symbol));

/**
 * Assign members of second array to first
 * @private
 * @param  {Array} to    Target array to assign to
 * @param  {Array} from  The array from which to assign respective values
 * no return value
 */
const assignArray = (to, from) => from.forEach((item, index) => assignable(to[index]) && assignable(item) ? assign(to[index], item) : to.push(item));

/**
 * Perform getOwnPropertySymbols when available
 * @private
 * @param  {Object} object
 * @return {Array} List of symbol keys (falls back to an empty array)
 */
const getOwnPropertySymbols = (object) => Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];

/**
 * assign one key from one object to the target
 * @private
 * @param  {Object} to   Target object to assign to
 * @param  {Object} from The object to assign value
 * @param  {String|Symbol} key
 * no return value
 */
function assignKey(to, from, key) {
    const easyAssign = !to.hasOwnProperty(key) || !assignable(from[key]);

    to[key] = easyAssign ? from[key] : assign(
        clone(to[key]),
        from[key]
    );
}

/**
 * Create a shallow clone of a given Object or Array
 * @private
 * @param  {Object|Array} instance Object or Array to clone
 * @return {Object|Array} (respectively) a shallow clone
 */
const clone = (instance) => Array.isArray(instance) ? instance.slice(0) : Object.assign({}, instance);

/**
 * Deep object assignment
 * @param  {Object}    target Target object to assign to
 * @param  {...Object} others The objects from which to deep assign respective values
 * @return {Object} Original target, assigned
 *
 * @example assign({hash: {a: 1}}, {hash: {b: 2, c: 0}}, {hash: {c: 3}}) // {hash: {a: 1, b:2, c: 3}}
 */
module.exports = function(target, ...others) {
    assignable(target) && others.forEach((other) => assign(target, other));

    return target;
}
