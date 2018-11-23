const {resolve} = require('path');

module.exports = ({entry}) => ({
	entry,
	output: {
		path: resolve(__dirname, '../dist'),
		filename: '[name].js',
	},
	mode: 'development',
	optimization: {
		usedExports: true,
	},
});
