const assign = require('./');

describe('assign', () => {
	it('mutates the original object', () => {
		const x = {a: 1};
		assign(x, {b: 2});
		expect(x.b).to.equal(2);
	});

	it('prefers later values', () => {
		const x = {a: 1};
		assign(x, {a: 2});
		expect(x.a).to.equal(2);
	});

	it('returns an object', () => {
		const x = {a: 1};
		const res = assign(x, {b: 2});
		expect(res.a).to.equal(1);
		expect(res.b).to.equal(2);
	});

	it('assigns multiple objects', () => {
		const a = {a: 1};
		const b = {b: 2, c: 1};
		const c = {c: 3, d: {a: 0, b: 0, c: 3}};
		const d = {d: {a: 1, b: 2}};
		assign(a, b, c, d);
		expect(a).to.deep.equal({a: 1, b: 2, c: 3, d: {a: 1, b: 2, c: 3}});
	});

	it('ignores random "null"s and "undefined"s in the arguments', () => {
		expect(assign({a: 1}, null, {b: 2}, undefined))
			.to.deep.equal({a: 1, b: 2});
		expect(assign({a: 1}, undefined))
			.to.deep.equal({a: 1});
		expect(assign(undefined, {a: 1}))
			.to.equal(undefined);
		expect(assign(null, {a: 1}))
			.to.equal(null);
	});

	it('does not assign other arguments', () => {
		const a = {a: 1};
		const b = {c: 3, d: {a: 0, b: 0, c: 3}};
		const c = {c: 1, d: {a: 1, b: 2}};
		assign(a, b, c);
		expect(b).to.deep.equal({c: 3, d: {a: 0, b: 0, c: 3}});
	});

	it('assigns many', () => {
		const x = {a: 1, x: {a: 1, b: 2}};
		assign(x, {x: {c: 3}}, {x: {d: 4}});
		expect(x.x.c).to.equal(3);
		expect(x.x.d).to.equal(4);
	});

	it('Does not break over primitives', () => {
		expect(assign('hello', 'world')).to.equal('hello');
		expect(assign(1, 2)).to.equal(1);
		expect(assign(true, 'string')).to.equal(true);
		expect(assign([], 'string')).to.deep.equal('string'.split(''));
		expect(assign(null, {})).to.equal(null);
	});
});
