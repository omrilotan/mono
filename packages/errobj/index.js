const errorStackParser = require('error-stack-parser');
const props = require('./lib/props');
const verify = require('./lib/verify');

const parse = errorStackParser.parse.bind(errorStackParser);

/**
 * Serialise error
 * @param  {Error}  error
 * @param  {Object} [enrichment={}]
 * @param  {Number} [options.offset=0] Number of rows to remove from stack top
 * @return {Object}
 */
module.exports = function errobj(error, enrichment = {}, {offset = 0, parsedStack = false} = {}) {
	verify(error);

	const parsed = parse(error);

	if (typeof offset === 'number' && offset > 0) {
		parsed.splice(0, offset);
	}

	parsedStack && Object.assign(error, {parsedStack: parsed});

	return Object.assign(
		props(error).reduce(
			(accumulator, key) => error[key]
				?
				Object.assign(
					accumulator,
					{[key]: error[key]}
				)
				:
				accumulator,
			{...parsed[0]}
		),
		enrichment
	);
};
