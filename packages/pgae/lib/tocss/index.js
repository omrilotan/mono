const reduce = require('await-reduce');
const {promisify} = require('util');
const transpile = async data => (
	await promisify(
		require('node-sass').render
	)({data})
).css.toString();
const {processString} = require('uglifycss');

/**
 * Compiles a sass source to css
 * @param  {String} content
 * @return {String}
 */
module.exports = async content => await reduce(
	[
		transpile,
		processString,
	],
	async(input, fn) => await fn(input),
	content
);
