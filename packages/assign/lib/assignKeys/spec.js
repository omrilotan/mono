const assignKeys = require('.');

describe('assign/assignKeys', () => {
	it('Should assign second object keys to first', () => {
		const obj = {a: 1, b: 2};
		assignKeys(obj, {b: 3, c: 4});
		expect(obj).to.deep.equal({a: 1, b: 3, c: 4});
	});
});
