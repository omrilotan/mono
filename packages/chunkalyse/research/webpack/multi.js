const {resolve, extname} = require('path');
const config = require('.');
const {readdirSync} = require('fs');

module.exports = config({
	entry: readdirSync(resolve(__dirname, '../src/modules/')).reduce(
		(accumulator, file) => Object.assign(
			accumulator,
			{[file.replace(extname(file), '')]: resolve(__dirname, '../src/modules/', file)}
		),
		{}
	),
});
