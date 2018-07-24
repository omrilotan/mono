/**
 * @module Gauge
 * @since 1.0.0
 */

/**
 * @class Gauge
 * @classdesc a constructor able to wrap methods with a report method
 *
 * @param {Function} report
 * @returns {Function} function wrapper
 *
 * @example
 * const gauge = new Gauge((ms, name) => console.log(`${name} took ${ms}ms`));
 * myThing.method = gauge(myThing.method, 'Method name or description');
 */
module.exports = class Gauge {
	constructor(report) {
		this.report = report;

		return this.wrap.bind(this);
	}

	/**
	 * wrap a function with the report callback, accepting the time it took to complete the operation
	 * @param  {Function} fn
	 * @param  {String}   name
	 * @return {Function}
	 */
	wrap(fn, name) {
		const report = this.report;

		function wrapped(...args) {
			const start = Date.now();
			const result = fn.apply(this, args);

			report(Date.now() - start, name);
			return result;
		}

		wrapped.__original = fn;

		return wrapped;
	}
}
