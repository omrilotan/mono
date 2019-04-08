module.exports = {
	extends: 'eslint:recommended',
	env: {
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		indent: [
			'error', 'tab', {
				SwitchCase: 1,
				FunctionDeclaration: {
					body: 1,
					parameters: 2,
				},
			},
		],
		semi: ['error', 'always'],
		'arrow-parens': [2, 'as-needed'],
		'comma-dangle': ['error', 'always-multiline'],
		quotes: ['error', 'single'],
		'dot-location': ['error', 'property'],
		'dot-notation': 'error',
		'no-implicit-globals': 'error',
	},
	overrides: [
		{
			files: [ '**/spec.js' ],
			env: {
				mocha: true,
			},
			globals: {
				expect: true,
				assert: true,
			},
		},
		{
			files: [ 'bin.js', '**/bin.js' ],
			rules: {
				'no-console': 0,
				'no-octal': 0,
			},
		},
	],
};
