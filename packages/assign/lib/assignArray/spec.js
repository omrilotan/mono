const assignArray = require('.');

describe('assign/assignArray', () => {
	it('Should push plain array items', () => {
		const array = [1, 2];
		assignArray(array, [2, 3]);
		expect(array).to.deep.equal([1, 2, 2, 3]);
	});
	it('Should assign assignable array items (by position)', () => {
		const array = [{firstName: 'Omri'}, {firstName: 'Tom'}];
		assignArray(array, [{lastName: 'Lotan'}, {lastName: 'Ben Amitai'}]);
		expect(array).to.deep.equal([{firstName: 'Omri', lastName: 'Lotan'}, {firstName: 'Tom', lastName: 'Ben Amitai'}]);
	});
	it('Should push non-assignables after merging assignable items', () => {
		const array = [1, [1, 2]];
		assignArray(array, [2, [3, 4]]);
		expect(array).to.deep.equal([1, [1, 2, 3, 4], 2]);
	});
});
