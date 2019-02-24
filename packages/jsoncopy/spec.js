const jsoncopy = require('.');

describe('jsoncopy', () => {
	it('Should create a deep copy', () => {
		const ref = {d: 4};
		const orig = {a: {b: 3}, c: ref};
		const copy = jsoncopy(orig);

		orig.a.b = 4;
		ref.d = 2;

		expect(orig).to.deep.equal({a: {b: 4}, c: {d: 2}});
		expect(copy).to.deep.equal({a: {b: 3}, c: {d: 4}});
	});

	it('Should omit functions from copy', () => {
		const orig = {a: 1, b: () => null};
		const copy = jsoncopy(orig);

		expect(copy).to.deep.equal({a: 1});
	});

	it('Should throw error for circular references', () => {
		const orig = {a: 1};
		orig.s = orig;

		expect(
			() => jsoncopy(jsoncopy)
		).to.throw(SyntaxError);

		expect(
			() => jsoncopy({win: global})
		).to.throw(SyntaxError);
	});

});
