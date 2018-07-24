require('colors');
const length = require('./');

describe('boxt/length', () => {
	it('length of a string', () => {
		expect(length('my length')).to.equal(9);
	});


	Array.from(Object.entries({
		'Pictographs, Punctuation': [ '☀︎', '🁓', '…', '¶' ],
		'Emojis': [ '💩', '❤️' ],
		// 'Compound Emojis': [ '🏃‍♀️', '👩‍❤️‍💋‍👩' ]
		// 'flags': [ '🇧🇷' ],
		// 'modifiers': [ '🙌🏾' ]
	})).forEach(([name, values]) => {
		describe(`${name}: ${values.join(', ')}`, () => {
			it('are single characters', () => {
				values.forEach($ => {
					expect(length($)).to.equal(1);
				});
			});

			it('in a sentence', () => {
				values.forEach($ => {
					const result = 'This $ char fits $ in a sentence'.length;
					const decorated = `This ${$} char fits ${$} in a sentence`;

					expect(length(decorated)).to.equal(result);
				});
			});
		});
	});

	it('punctuation symbols', () => {
		const result = 'מה שלומך היום'.length;
		const decorated = 'מָה שְׁלוֹמְךָ הַיּוֹם';

		expect(length(decorated)).to.equal(result);
	});

	it('terminal coloured strings', () => {
		expect(length('red'.red)).to.equal(3);
	});

	it('terminal coloured strings in a sentence', () => {
		const result = 'this text is red and STRONG'.length;
		const decorated = `this text is ${'red'.red} and ${'STRONG'.yellow.bold.underline}`;

		expect(length(decorated)).to.equal(result);
	});
});
