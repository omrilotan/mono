const formatter = require('./lib/formatter');
const types = require('./lib/types');
const createSender = require('./lib/udp');
const push = require('./lib/push');
const flush = require('./lib/flush');
const TYPES = Object.freeze(
	Object.keys(types).reduce(
		(accumulator, type) => Object.assign(
			accumulator,
			{[type]: type}
		),
		{}
	)
);

/**
 * 57475 Client
 * @property {Number}          MTU
 * @property {Number}          TTL
 * @property {Object}          tags
 * @property {Array}           bulk
 * @property {Number}          timer
 * @property {Function}        send
 * @property {Function}        format
 * @property {Function(bound)} flush
 *
 * @property {Number}   size
 * @property {Function} generic
 * @property {Function} count
 * @property {Function} time
 * @property {Function} gauge
 * @property {Function} set
 * @property {Function} histogram
 */
class Client {
	/**
	 * @static
	 * @getter
	 * @type {Object}
	 * @property {String} count     'count'
	 * @property {String} time      'time'
	 * @property {String} gauge     'gauge'
	 * @property {String} set       'set'
	 * @property {String} histogram 'histogram'
	 */
	static get TYPES() {
		return TYPES;
	}

	/**
	 * 57475 Client constructor
	 * @param {String}   [options.host='127.0.0.1']
	 * @param {String}   [options.port=8125]
	 * @param {String}   [options.protocol='ipv4']
	 * @param {Number}   [options.MTU=576]
	 * @param {Number}   [options.TTL=1000]
	 * @param {Object}   [options.tags]
	 * @param {String}   [options.tagsStyle='DD']
	 * @param {String}   [options.prefix]
	 * @param {Function} [options.sanitise=(default sanitiser)]
	 * @param {Function} [options.errorHandler]
	 */
	constructor(
		{
			host = '127.0.0.1',
			port = 8125,
			protocol = 'ipv4',
			MTU = 576,
			TTL = 1000,
			tags,
			tagsStyle,
			prefix,
			sanitise,
			errorHandler,
		} = {}
	) {
		Object.assign(
			this,
			{
				MTU, // Maximum Transmission Unit
				TTL,
				tags,
				errorHandler,
				bulk: [],
				timer: 0,
				send: createSender({host, port, protocol, errorHandler}),
				format: formatter({sanitise, prefix, tagsStyle}),
				flush: flush.bind(this),
			}
		);
	}

	/**
	 * The size of current bulk
	 * @return {Number}
	 */
	get size() {
		return this.bulk.join('\n').length;
	}

	/**
	 * Generic metric send method
	 * @param  {String} type           Metric type
	 * @param  {String} key            The metric name (key)
	 * @param  {Number} [value=1]      The value to report
	 * @param  {Number} [options.rate] Sample rate - a fraction of 1 (.01 is one percent)
	 * @param  {Object} [options.tags] Key-value pairs of tags set as object literal
	 * @return {Number}                current size of the bulk
	 */
	generic(type, key, value, { rate, tags } = {}) {
		if (rate) {
			if (typeof rate !== 'number') {
				throw new TypeError(`Expected 'rate' to be a number, instead got a ${typeof rate}`);
			}
			if (rate > 1) {
				throw new TypeError(`Expected 'rate' to be a number between 0 and 1, instead got ${rate}`);
			}

			// Apply sample rate
			if (Math.random() < rate) {
				return this.size;
			}
		}

		if (this.tags) {
			tags = Object.assign({}, this.tags, tags || {});
		}

		return push.call(
			this,
			this.format(
				type,
				key,
				value,
				{ rate, tags }
			)
		);
	}
}

Object.defineProperties(
	Client.prototype,
	Object.keys(types).reduce(
		(accumulator, type) => Object.assign(
			accumulator,
			{
				[type]: {
					/**
					 * Specific metric type send method
					 * @param  {String} key            The metric name (key)
					 * @param  {Number} [value]        The value to report
					 * @param  {Number} [options.rate] Sample rate - a fraction of 1 (.01 is one percent)
					 * @param  {Object} [options.tags] Key-value pairs of tags set as object literal
					 * @return {Number}                current size of the bulk
					 */
					value: function(...args) {
						return this.generic(type, ...args);
					},
				},
			}
		),
		{}
	)
);

module.exports = Client;
