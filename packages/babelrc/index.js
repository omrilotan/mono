module.exports = {
	presets: [
		[
			require('@babel/preset-env'),
			{
				targets: {
					browsers: ['last 4 versions', 'not ie <= 10'],
				},
			},
		],
	],
	plugins: [
		require('@babel/plugin-transform-spread'),
		require('@babel/plugin-transform-parameters'),
		require('@babel/plugin-syntax-dynamic-import'),
		require('@babel/plugin-syntax-import-meta'),
		[require('@babel/plugin-proposal-class-properties'), { loose: false }],
		require('@babel/plugin-proposal-json-strings'),
	],
};
