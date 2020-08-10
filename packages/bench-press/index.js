const paraphrase = require('paraphrase');

const phraser = paraphrase(/\${([^{}]*)}/gm);

/**
 * Run a given function N times
 * @param  {Function} fn
 * @param  {Object}   [options]
 * @param  {String}   [options.message='Running ${iterations} times took ${duration}ms']
 * @param  {Number}   [options.iterations=1000]
 * @return {String}
 */
module.exports = function benchpress(fn, { message = 'Running ${iterations} times took ${duration}ms', iterations = 1e3 } = {}) {
	const start = Date.now();
	let count = iterations;

	while (count--) {
		fn();
	}

	const duration = Date.now() - start;

	return phraser(message, { iterations, duration });
};
