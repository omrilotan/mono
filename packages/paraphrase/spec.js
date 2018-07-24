const paraphrase = require('./');

describe('paraphrase', () => {
	describe('paraphrase basic functionality', () => {
		const phrase = paraphrase(/\${([^{}]*)}/g);
		it('instance can process string', () => expect(phrase.bind(null, '')).to.not.throw(TypeError));
		it('instance can not process non string', () => expect(phrase.bind(null, {})).to.throw(TypeError));
	});

	describe('paraphrase replacers', () => {
		it('multiple and similar replacement values', () => {
			const phrase = paraphrase(/\${([^{}]*)}/g);
			const first = 'Martin';
			const last = 'Prince';

			const res = phrase('Hello, ${ first } ${ first } ${ last }', {first, last});
			expect(phrase(res)).to.equal(`Hello, ${first} ${first} ${last}`);
		});

		it('multiple replacers', () => {
			const phrase = paraphrase(
				/\${([^{}]*)}/g,
				/%{([^{}]*)}/g,
				/{{([^{}]*)}}/g
			);
			const first = 'Martin';
			const last = 'Prince';
			const res = phrase('Hello, ${ first } %{ first } {{ last }}', {first, last});
			expect(phrase(res)).to.equal(`Hello, ${first} ${first} ${last}`);
		});
	});

	describe('works with spread arguments', () => {
		const phrase = paraphrase(/\${([^{}]*)}/g);

		it('Uses string arguments', () => {
			const string = 'Hello, ${0} ${1}';

			expect(phrase(string, 'Martin', 'Prince')).to.equal('Hello, Martin Prince');
		});

		it('Uses number arguments', () => {
			const string = 'Hello, ${0} ${1}';

			expect(phrase(string, 4, 6)).to.equal('Hello, 4 6');
		});
	});

	describe('Resolve nested data', () => {
		const phrase = paraphrase(/\${([^{}]*)}/g);

		it('resolves dot notation', () => {
			const string = 'Hello, ${name.first} ${name.last}';
			const data = {
				name: {
					first: 'Martin',
					last: 'Prince',
				}
			};

			expect(phrase(string, data)).to.equal('Hello, Martin Prince');
		});

		it('resolves arrays', () => {
			const string = 'Hello, ${0} ${1}';
			const name = [
				'Martin',
				'Prince',
			];

			expect(phrase(string, name)).to.equal('Hello, Martin Prince');
		});
	});

	describe('premade', () => {
		Object.entries({
			'dollar': 'Hello, ${name}',
			'double': 'Hello, {{name}}',
			'percent': 'Hello, %{name}',
			'hash': 'Hello, #{name}',
		}).forEach(([key, value]) => {
			it(key, () => {
				expect(
					require(`./${key}`)(value, {name: 'Martin'})
				).to.equal(
					'Hello, Martin'
				);
			});
		});
	});
});
