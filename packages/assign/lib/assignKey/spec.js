const assignKey = require('.');

describe('assign/assignKey', () => {
	it('Should assign just member from one object to the target', () => {
		const target = { a: 1, b: 2 };
		assignKey(target, { b: 3, c: 4 }, 'b');
		expect(target).to.deep.equal({ a: 1, b: 3 });
	});
	it('Should assign the member recursively', () => {
		const target = { a: { x: 1, y: 2 } };
		assignKey(target, { a: { z: 3 } }, 'a');
		expect(target).to.deep.equal({ a: { x: 1, y: 2, z: 3 } });
	});
	it('Should not affect construct prototype', () => {
		const target = { a: { x: 1, y: 2 } };
		const original = target.__proto__;
		const attackObject = { prototype: { method: () => null } };
		assignKey(target, { __proto__: attackObject }, '__proto__');
		expect(target.__proto__).to.equal(original);
	});
});
