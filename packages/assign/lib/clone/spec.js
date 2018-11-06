const clone = require('.');

describe('assign/clone', () => {
	it('Should create a shallow clone for arrays', () => {
		const array = [1, 2, 3];
		expect(clone(array)).to.not.equal(array);
		expect(clone(array)).to.deep.equal(array);
	});
	it('Should create a shallow clone for an object', () => {
		const obj = {a: 1, b: 2, c: 3};
		expect(clone(obj)).to.not.equal(obj);
		expect(clone(obj)).to.deep.equal(obj);
	});
	it('Should create a shallow clone', () => {
		const array = [{a: 1}];
		expect(clone(array)[0]).to.equal(array[0]);
	});
});
