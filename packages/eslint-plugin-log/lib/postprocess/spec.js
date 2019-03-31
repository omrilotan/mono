const postprocess = require('.');

describe('eslint-plugin-log/postprocess', () => {
	it('Should return the first message', () => {
		expect(
			postprocess(['message one', 'message two'], 'message three')
		).to.equal('message one');
	});
});
