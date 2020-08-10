const message = require('.');

describe('ecma-webpack-plugin/lib/message', () => {
	it('Should format collection or errors to a message', () => {
		const mgs = message([
			{ name: 'file1', message: 'had error 1' },
			{ name: 'file2', message: 'had error 2' },
			{ name: 'file3', message: 'had error 3' },
		]);
		expect(mgs).to.include('Found parsing errors in');
		expect(mgs).to.include('file1');
		expect(mgs).to.include('file2');
		expect(mgs).to.include('file3');
		expect(mgs).to.include('had error 1');
		expect(mgs).to.include('had error 2');
		expect(mgs).to.include('had error 3');
	});
});
