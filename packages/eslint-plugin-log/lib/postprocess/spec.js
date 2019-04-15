const postprocess = require('.');

const exampleArguments = [
	[
		[
			{
				'ruleId': 'comma-dangle',
				'severity': 2,
				'message': 'Missing trailing comma.',
				'line': 11,
				'column': 9,
				'nodeType': 'Property',
				'messageId': 'missing',
				'fix': {
					'range': [
						257,
						257,
					],
					'text': ',',
				},
			},
			{
				'ruleId': 'no-unused-vars',
				'severity': 2,
				'message': '\'key\' is defined but never used.',
				'line': 17,
				'column': 61,
				'nodeType': 'Identifier',
				'endLine': 17,
				'endColumn': 64,
			},
		],
	],
	'/path/to/file.js',
];

describe('eslint-plugin-log/postprocess', () => {
	it('Should return the messages content', () => {
		const messages = postprocess(...exampleArguments);
		expect(messages).to.equal(exampleArguments[0][0]);
		expect(messages).to.have.lengthOf(2);
	});
});
