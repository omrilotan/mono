/**
 * Block the runtime
 * @param  {Number} ms Milliseconds
 * no return value
 */
module.exports = function(ms) {
	const wake = Date.now() + ms;
	while (Date.now() < wake) {} // eslint-disable-line no-empty
}
