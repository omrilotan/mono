const sanitiser = require('.');

describe('57475/sanitiser', () => {
	it(
		'Should convert non alphanumeric characters to underscores',
		() => [
			'$',
			'*',
			'-',
			' ',
		].forEach(char => expect(sanitiser(char + char)).to.equal('__'))
	);
	it(
		'Should lowercase input',
		() => expect(sanitiser('HELLO')).to.equal('hello')
	);
	it(
		'Should not change letters, numbers, underscores and dots',
		() => [
			'hello',
			'1234',
			'...',
			'___',
			'abc_8ii.hello__',
		].forEach(char => expect(sanitiser(char + char)).to.equal(`${char}${char}`))
	);
	it(
		'Should convert characters that are not alphanumeric or dots to underscores, lowercase',
		() => expect(sanitiser('abc$8ii.HEllo😜')).to.equal('abc_8ii.hello__')
	);
});
