const {resolve, extname} = require('path');
const {readdirSync} = require('fs');

const config = ({entry}) => ({
	entry,
	output: {
		path: resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	optimization: {
		usedExports: true,
	},
});

module.exports = [
	config({
		entry: resolve(__dirname, './src/index.js'),
	}),
	config({
		entry: readdirSync(resolve(__dirname, './src/modules/')).reduce(
			(accumulator, file) => Object.assign(
				accumulator,
				{[file.replace(extname(file), '')]: resolve(__dirname, './src/modules/', file)}
			),
			{}
		),
	}),
];
