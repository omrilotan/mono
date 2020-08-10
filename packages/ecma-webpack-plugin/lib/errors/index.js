const { parse } = require('acorn');
const extension = require('../extension');

/**
 * Map errors
 * @param  {Object} compilation.assets
 * @param  {Object} options.extensions
 * @return {Object}
 */
module.exports = (
	{ assets } = {},
	{ extensions, parser } = {},
) => Object.entries(assets)
	.reduce(
		(accumulator, [ name, { _value: content } ]) => {
			if (!extensions.includes(extension(name))) {
				return accumulator;
			}

			try {
				parse(content, parser);
			} catch ({ message }) {
				accumulator.push({ name, message });
			}

			return accumulator;
		},
		[],
	);
