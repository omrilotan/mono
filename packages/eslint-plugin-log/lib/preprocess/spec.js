const pretprocess = require('.');

describe('eslint-plugin-log/pretprocess', () => {
	it('Should return a flat array including file contents', () => {
		expect(
			pretprocess('some file content', 'filename'),
		).to.deep.equal(['some file content']);
	});
});
