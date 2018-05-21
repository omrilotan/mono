/**
 * @module lib/resolve
 * @since 1.1.0
 */

/**
 * Resolve dot notation string
 *
 * @param  {String} [string=''] Dot notation representation
 * @param  {Object} context     Object to start notation search (defaults to global scope)
 * @return {Any}                Whatever it finds / undefined
 *
 * @example
 * const root_object = {
 *   top_level: {
 *     nested: {
 *       value: 'My Value'
 *     }
 *   }
 * };
 *
 * resolve('top_level.nested.value', root_object);
 * // 'My Value'
 *
 * resolve('top_level.missing.value', root_object);
 * // undefined
 */
module.exports = (string = '', source) => string
    .split('.')
    .reduce(
        (previous, current) => typeof previous === 'object' ? previous[current] : previous,
        source
    );
