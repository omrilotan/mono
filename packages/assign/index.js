/**
 * @module assign
 */

const assign = require('./lib/assign');
const assignable = require('./lib/assignable');

/**
 * Deep object assignment
 * @param  {Object}    target Target object to assign to
 * @param  {...Object} others The objects from which to deep assign respective values
 * @return {Object} Original target, assigned
 *
 * @example assign({hash: {a: 1}}, {hash: {b: 2, c: 0}}, {hash: {c: 3}}) // {hash: {a: 1, b:2, c: 3}}
 */
module.exports = function(target, ...others) {
	assignable(target) && others.forEach(other => assign(target, other));

	return target;
};
