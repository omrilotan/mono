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

	it('merges deep objects', () => {
		const x = {a: 1, x: {a: 1}};
		assign(x, {x: {b: 2}});
		expect(x.x.a).to.equal(1);
		expect(x.x.b).to.equal(2);
	});

	it('merges arrays', () => {
		const x = [1];
		const y = [2];
		assign(x, y);
		expect(x).to.deep.equal([1, 2]);
	});

	it('merges nested arrays', () => {
		const x = {a: 1, x: [1]};
		const y = {x: [2]};
		assign(x, y);
		expect(x).to.deep.equal({a: 1, x: [1, 2]});
	});

	it('merges arrays with objects', () => {
		const x = {a: 1, x: [{a: 1}]};
		const y = {x: [{b: 2}, {c: 3}]};
		assign(x, y);
		expect(x).to.deep.equal({a: 1, x: [{a: 1, b: 2}, {c: 3}]});
	});

	it('merges nested object in array', () => {
		const x = {x: [{a: 1}]};
		const y = {x: [{b: 2}]};
		assign(x, y);
		expect(x).to.deep.equal({x: [{a: 1, b: 2}]});
	});

	it('handles null and undefined', () => {
		const x = {a: 1, x: {a: 1, b: 2}};
		assign(x, {x: {a: undefined}});
		assign(x, {x: {b: null}});
		expect(x.x.a).to.equal(undefined);
		expect(x.x.b).to.equal(null);
	});

	it('assigns many', () => {
		const x = {a: 1, x: {a: 1, b: 2}};
		assign(x, {x: {c: 3}}, {x: {d: 4}});
		expect(x.x.c).to.equal(3);
		expect(x.x.d).to.equal(4);
	});

	it('does not mutate other arguments', () => {
		const x = {a: 1};
		const b = {b: 2};
		const c = {c: 3};
		assign(x, b, c);
		expect(x.b).to.equal(2);
		expect(b).to.have.keys('b');
	});

	it('assigns symbols', () => {
		const x = {a: 1};
		const y = {};
		const a = Symbol('a');
		const b = Symbol.for('b');
		const c = Symbol();
		y[a] = 10;
		y[b] = 10;
		y[c] = 10;
		assign(x, y);
		expect(x[a]).to.equal(10);
		expect(x[b]).to.equal(10);
		expect(x[c]).to.equal(10);
	});

	it('assigns enumerable properties only', () => {
		const x = {a: 1};
		const y = {};
		Object.defineProperty(y, 'a', {
			enumerable: true,
			value: 10,
		});
		Object.defineProperty(y, 'b', {
			enumerable: false,
			value: 10,
		});
		assign(x, y);
		expect(x.a).to.equal(10);
		expect(x.b).to.equal(undefined);
	});

	it('Does not break over primitives', () => {
		expect(assign('hello', 'world')).to.equal('hello');
		expect(assign(1, 2)).to.equal(1);
		expect(assign(true, 'string')).to.equal(true);
		expect(assign([], 'string')).to.deep.equal('string'.split(''));
		expect(assign(null, {})).to.equal(null);
	});
});
