const opts = require('.');

describe('create-git-alias/opts', () => {
	it('Should ignore all opts not beginning with minus', () => {
		const argv = [
			'/Users/root/.nvm/versions/node/v10.9.0/bin/node',
			'/spaceship/mono/packages/create-git-alias/index.js',
		];
		expect(opts(argv)).to.be.empty;
	});
	it('Should map all opts that start with minus', () => {
		const argv = [
			'/Users/root/.nvm/versions/node/v10.9.0/bin/node',
			'/spaceship/mono/packages/create-git-alias/index.js',
			'--option',
			'something',
			'-o',
			'----argument',
			'--argument-two',
		];
		expect(opts(argv)).to.deep.equal([ 'option', 'o', 'argument', 'argument-two' ]);
	});
});
