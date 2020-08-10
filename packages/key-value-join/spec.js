const join = require('.');

describe('key-value-join', () => {
	it('Should map using default delimiters', () => {
		expect(join({ a: 1, b: 2 })).to.equal('a:1,b:2');
	});
	it('Should map using custom delimiters', () => {
		expect(
			join({ a: 1, b: 2 }, '=', '&'),
		).to.equal('a=1&b=2');
	});
	it('Should be able to filter entries', () => {
		expect(
			join({ a: 1, b: 2, c: 3, d: undefined, e: 0 }, '=', '&', ([ , value ]) => Boolean(value) && value !== 2),
		).to.equal('a=1&c=3');
	});
	it('Should convert keys and values to string', () => {
		expect(join({ a: true, b: undefined, c: { a:1 } })).to.equal('a:true,b:undefined,c:[object Object]');
	});
	[
		[ true, 'true' ],
		[ undefined, 'undefined' ],
		[ { a:1 }, '[object Object]' ],
		[ null, 'null' ],
	].forEach(([ item, representation ]) => {
		it(`Should represent ${JSON.stringify(item)} as a string (${representation})`, () => {
			expect(join({ a: item })).to.equal(`a:${representation}`);
		});
	});
});
