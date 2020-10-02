module.exports = {
	extends: 'eslint:recommended',
	env: {
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'import',
	],
	rules: {
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-parens': [ 2, 'as-needed' ],
		'comma-dangle': [ 'error', 'always-multiline' ],
		'comma-spacing': 'error',
		'dot-location': [ 'error', 'property' ],
		'dot-notation': 'error',
		'eol-last': 'error',
		indent: [
			'error', 'tab', {
				SwitchCase: 1,
				FunctionDeclaration: {
					body: 1,
					parameters: 2,
				},
			},
		],
		'no-multiple-empty-lines': [
			'error', {
				max: 1,
				maxBOF: 0,
				maxEOF: 0,
			},
		],
		'no-implicit-globals': 'error',
		'no-multi-spaces': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [ 'error', 'always' ],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always' ],
		'import/no-self-import': 2,
		'import/no-internal-modules': 0,
		'import/no-dynamic-require': 0,
		'import/no-useless-path-segments': 2,
		'import/order': 1,
		'import/newline-after-import': 2,
	},
	overrides: [
		{
			files: [ '**/spec.js', '**/test.js', '**/spec.mjs', '**/test.mjs' ],
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
		{
			files: [ 'sw.js', 'serviceworker.js' ],
			env: {
				browser: true,
				serviceworker: true,
			},
		},
	],
};
