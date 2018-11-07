const assignMap = require('./index');

describe('assign/assignMap', () => {
	it('Should push plain map items', () => {
		const map = new Map([[1, 2], [3, 4]]);
		assignMap(map, new Map([[2, 3], [4, 5]]));
		expect(map).to.deep.equal(new Map([[1, 2], [2, 3], [3, 4], [4, 5]]));
	});
	it('Should assign assignable map items (by position)', () => {
		const map = new Map([[1, 2], [3, 4]]);
		assignMap(map, new Map([[1, 3], [4, 5]]));
		expect(map).to.deep.equal(new Map([[1, 3], [3, 4], [4, 5]]));
	});
});
