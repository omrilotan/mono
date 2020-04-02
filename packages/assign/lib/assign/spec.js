const assign = require('.');

describe('assign/assign', () => {
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
		expect(x).to.deep.equal([2]);
	});

	it('merges nested arrays', () => {
		const x = {a: 1, x: [1, 1]};
		const y = {x: [2]};
		assign(x, y);
		expect(x).to.deep.equal({a: 1, x: [2, 1]});
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
});
