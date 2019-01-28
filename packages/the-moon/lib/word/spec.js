const word = require('.');

describe('the-moon/word', () => {
	it(
		'Should convert kebab case to capitalised words',
		() => expect(word('this-is-my-input')).to.equal('This Is My Input')
	);
});
