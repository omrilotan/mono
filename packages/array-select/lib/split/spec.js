const split = require('.');

describe('array-select/lib/split', () => {
	it('Should split array in two according to condition', () => {
		const [odd, even] = split(
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			i => i % 2
		);

		expect(odd).to.deep.equal([1, 3, 5, 7, 9]);
		expect(even).to.deep.equal([2, 4, 6, 8, 10]);
	});

	it('Should be privileged to all reduce arguments', () => {
		const [original, duplicates] = split(
			[1, 1, 2, 3, 4, 1, 3, 8],
			(item, index, array) => index === array.indexOf(item)
		);

		expect(original).to.deep.equal([1, 2, 3, 4, 8]);
		expect(duplicates).to.deep.equal([1, 1, 3]);
	});
});
