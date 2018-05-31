/**
 * @module Benchmark
 * @since 1.0.0
 * @requires lib/gauge
 */

const Gauge = require('../gauge');

/**
 * @class Benchmark
 * @classdesc Returns a benchmark function to run
 *
 * @param  {Function} callback[] Function to callback to with the result. Defaults to console.log
 * @param  {Function} formatter[] Function to format the result string accepts milliseconds{Numebr} and name{String} parameters
 * @return {Function} benchmark instance's run benchmark functions
 *
 * @example const benchmark = new Benchmark();
 * benchmark(
 *   1e4,
 *   [() => {"Do thing one"  }, 'Thing 1 description',],
 *   [() => {"Do thing two"  }, 'Thing 2 description',],
 *   [() => {"Do thing three"}, 'Thing 3 description',]
 * )
 *
 * const customisedBenchmark = new Benchmark(console.info, (ms, name) => `Method: ${name}, Time: ${ms}ms`);
 */
module.exports = class Benchmark {
    constructor(
        callback = console.log,
        formatter = (ms, name) => `${name} took ${ms}ms`
    ) {
        this.gauge = new Gauge((...args) => callback(formatter(...args)));
        return this.run.bind(this);
    }

    /**
     * Run a list of functions through a gauge measure iteration
     * @param  {Number}    times Times to run the functions
     * @param  {Map[]} ...tests maps: {Function}: function to test, {name}: Name to report
     * no return value
     */
    run(times, ...tests) {
        while(tests.length) {

            // Extract one of the tests randomly
            const test = tests.splice(Math.floor(Math.random() * tests.length), 1)[0];

            this.measure(test[0], times, test[1]);
        }
    }

    /**
     * Iterate other a function n times inside a pre defined gauge
     * @param  {Function} fn Function to run, should accept no arguments
     * @param  {Number}   [iterations=10000] Times to run the functions
     * @param  {String}   message    Message to return to the gauge instance
     * no return value
     */
    measure(fn, iterations = 10000, message = fn.toString()) {
        this.gauge(() => repeat(fn, iterations), message)();
    }
}

/**
 * Repeat a given function n times
 * @private
 * @param  {Function} fn         Given function to run
 * @param  {Number}   iterations How many times to run it
 * no return value
 */
function repeat(fn, iterations = 0) {
    while (iterations--) {
        fn();
    }
}
