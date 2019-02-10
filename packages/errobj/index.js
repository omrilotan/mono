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
module.exports = (error, enrichment = {}, {offset = 0} = {}) => {
	verify(error);

	const parsedStack = parse(error);

	if (typeof offset === 'number' && offset > 0) {
		parsedStack.splice(0, offset);
	}

	error.details = Object.assign(
		error.details || {},
		{parsedStack}
	);

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
			{...parsedStack[0]}
		),
		enrichment
	);
};
