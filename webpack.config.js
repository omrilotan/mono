const {resolve} = require('path');
const entry = require(resolve(__dirname, 'dists', 'entries'));

module.exports = {
	mode: 'production',
	entry,
	output: {
		filename: '[name]',
		path: resolve('/'),
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				loader: 'babel-loader',
				include: __dirname,
				sideEffects: false,
				options: require('./.babelrc.js'),
			},
		],
	},
};
