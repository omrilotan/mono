const {transform} = require('babel-core');
const {minify} = require('uglify-js');

const bbl = code => transform(code, {plugins: ['syntax-async-functions']}).code;
const uglify = code => {
	return code;

	try {
		return minify(code);
	} catch (error) {
		return code;
	}
}

/**
 * Babelise and uglify javascript
 * @param  {String} content
 * @return {String}
 */
module.exports = content => [
	bbl,
	uglify,
].reduce(
	(input, fn) => fn(input),
	content
);
