const assignArray = require('.');

describe('assign/assignArray', () => {
	it('Should push plain array items', () => {
		const array = [1, 2];
		assignArray(array, [2, 3]);
		expect(array).to.deep.equal([1, 2, 2, 3]);
	});
	it('Should assign assignable array items (by position)', () => {
		const array = [1, [1, 2]];
		assignArray(array, [2, [3, 4]]);
		expect(array).to.deep.equal([1, [1, 2, 3, 4], 2]);
	});
});
