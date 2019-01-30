const errorStackParser = require('error-stack-parser');
const props = require('./lib/props');
const verify = require('./lib/verify');

const parse = errorStackParser.parse.bind(errorStackParser);

/**
 * Serialise error
 * @param  {Error}  error
 * @param  {Object} [enrichment={}]
 * @return {Object}
 */
module.exports = (error, enrichment = {}) => {
	verify(error);

	const parsedStack = parse(error);
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
