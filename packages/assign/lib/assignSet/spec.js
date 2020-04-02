const assignSet = require('.');

describe('assign/assignSet', () => {
	it('Should push plain set items', () => {
		const set = new Set([1, 2]);
		assignSet(set, new Set([3, 4]));
		expect(set).to.deep.equal(new Set([3, 4]));
	});
	it('Should assign assignable set items (by position)', () => {
		const set = new Set([1, 2, 3]);
		assignSet(set, new Set([4, 5]));
		expect(set).to.deep.equal(new Set([4, 5, 3]));
	});
});
