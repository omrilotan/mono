const assignArray = require('.');

describe('assign/assignArray', () => {
	it('Should push plain array items', () => {
		const array = [ 1, 2 ];
		assignArray(array, [ 2, 3 ]);
		expect(array).to.deep.equal([ 2, 3 ]);
	});
	it('Should assign assignable array items (by position)', () => {
		const array = [ { firstName: 'Omri' }, { firstName: 'Tom' } ];
		assignArray(array, [ { lastName: 'Lotan' }, { lastName: 'Ben Amitai' } ]);
		expect(array).to.deep.equal([ { firstName: 'Omri', lastName: 'Lotan' }, { firstName: 'Tom', lastName: 'Ben Amitai' } ]);
	});
	it('Should push non-assignables after merging assignable items', () => {
		const array = [ 1, [ 1, 2 ] ];
		assignArray(array, [ 2, [ 3 ], 3 ]);
		expect(array).to.deep.equal([ 2, [ 3, 2 ], 3 ]);
	});
	it('Should skip undefined members', () => {
		const array = [ 1, 2, 3 ];
		assignArray(array, [ 4, undefined, 6 ]);
		expect(array).to.deep.equal([ 4, 2, 6 ]);
	});
});
