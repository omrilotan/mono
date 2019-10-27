const extensions = require('.');

describe('eslint-plugin-log/extensions', () => {
	it('Should expose an array of strings', () => {
		extensions.forEach(
			extension => expect(extension).to.be.a('string'),
		);
	});
	it('Should prefix extensions with dot', () => {
		extensions.forEach(
			extension => expect(extension).to.startWith('.'),
		);
	});
});
