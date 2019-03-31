const parser = require('yargs-parser');

/**
 * ESLint's unstructured output formats
 * @type {Array}
 */
const formats = [
	'compact',
	'stylish',
	'unix',
];

/**
 * some formats export XML or HTML, we don't want to break those
 * @param  {Array}   argv
 * @return {Boolean}
 */
const structuredFormat = ([,,...args]) => {
	const { format } = parser(args);

	return !!format && !formats.includes(format);
};

/**
 * Escape block to *not* log filenames
 * @param  {Array}   argv
 * @return {Boolean}      Should skip logging
 */
module.exports = argv => structuredFormat(argv);
