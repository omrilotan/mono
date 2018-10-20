const {transform} = require('babel-core');
const settings = require('./settings');

const bbl = code => transform(code, settings).code;

/**
 * Babelise and uglify javascript
 * @param  {String} content
 * @return {String}
 */
module.exports = content => [
	bbl,
].reduce(
	(input, fn) => fn(input),
	content
);
