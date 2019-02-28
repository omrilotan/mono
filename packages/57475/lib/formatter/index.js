const {
	KEY_VALUE,
	METRIC_TYPE,
	RATE,
	TAGS,
} = require('../delimiters');
const types = require('../types');
const tagsStyles = require('../tagsStyles');
const sanitiser = require('../sanitiser');
const letterLeading = string => /^[a-zA-Z]/.test(string);

/**
 * Creates a configured format function
 * @param  {String} [options.prefix]         Optional prefix to prepend to all instance metric
 * @param  {String} [options.sanitise]       Alternative sanitiser to the default one
 * @param  {String} [options.tagsStyle='CC'] Style of tag formatting
 * @return {Function}
 */
module.exports = function formatter({prefix, sanitise = sanitiser, tagsStyle = 'DD'} = {}) {
	if (prefix) {
		if (typeof prefix !== 'string') {
			throw new TypeError(`Expected 'prefix' to be a string, instead got a ${typeof prefix}`);
		}
		if (!letterLeading(prefix)) {
			throw new Error(`Prefix must start with an alphabetical character (${prefix}).`);
		}
	}

	sanitise = sanitise || (string => string);

	if (typeof sanitise !== 'function') {
		throw new TypeError(`Expected 'sanitise' to be a function, instead got a ${typeof sanitise}`);
	}

	if (!Object.keys(tagsStyles).includes(tagsStyle)) {
		throw new RangeError('tagsStyle must be either "DD" (DataDog) or "CC" (CarbonCache).');
	}

	const {TAGS_K_V, TAGS_LIST} = tagsStyles[tagsStyle];

	/**
	 * Format a StatsD metric
	 * @param  {String} type           The type of metric to report
	 * @param  {String} key            The metric name (key)
	 * @param  {Number|Date} value     The value to report
	 * @param  {Number} options.rate   Sample rate - a fraction of 1 (.01 is one percent)
	 * @param  {Object} options.tags   Key-value pairs of tags set as object literal
	 * @return {String}                Formatted StatsD metric
	 */
	return function format(type = 'count', key, value = 1, {rate, tags} = {}) {
		if (!types.hasOwnProperty(type)) {
			throw new RangeError(`Expected 'type' to be one of ${Object.keys(types).join(', ')}, instead got ${type}`);
		}
		if (typeof key !== 'string') {
			throw new TypeError(`Expected 'key' to be a string, instead got a ${typeof key}`);
		}
		if (!prefix && !letterLeading(key)) {
			throw new Error(`Expected 'key' to start with an alphabetical character (${key}).`);
		}
		if (value instanceof Date) {
			value = new Date() - value;
		}
		if (typeof value !== 'number') {
			throw new TypeError(`Expected 'value' to be a number, instead got a ${typeof value}`);
		}

		const parts = [
			sanitise(
				prefix
					? [prefix, key].join('.')
					: key
			),
			KEY_VALUE,
			value,
			METRIC_TYPE,
			types[type],
		];

		rate && parts.push(
			RATE,
			rate
		);

		tags && parts.push(
			TAGS,
			Object
				.entries(tags)
				.map(
					tag => tag
						.map(sanitise)
						.join(TAGS_K_V)
				)
				.join(TAGS_LIST)
		);

		return parts.join('');
	};
};
