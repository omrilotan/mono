const sortby = require('.');
const array = () => [
	{key: 4},
	{key: 3},
	{key: 5},
	{key: 2},
];

describe('sortby', () => {
	it('sanity', () => {
		expect(array().sort()).to.deep.equal(array());
	});
	it('Should sort array by a modifier function', () => {
		expect(
			sortby(array(), i => i.key)
		).to.deep.equal(
			[
				{key: 2},
				{key: 3},
				{key: 4},
				{key: 5},
			]
		);
	});
	it('Should sort array at a descending order', () => {
		expect(
			sortby(array(), i => i.key, {order: 'desc'})
		).to.deep.equal(
			[
				{key: 5},
				{key: 4},
				{key: 3},
				{key: 2},
			]
		);
	});
	it('Should sort array by a specific key', () => {
		expect(
			sortby(array(), 'key')
		).to.deep.equal(
			[
				{key: 2},
				{key: 3},
				{key: 4},
				{key: 5},
			]
		);
	});
});
