const distribute = require('.');

describe('array-select/lib/distribute', () => {
	it('Should distribute into ordered items', () => {
		const [smaller, bigger, nine] = distribute(
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			i => i < 5,
			i => i > 5,
			i => i === 9
		);

		expect(smaller).to.deep.equal([1, 2, 3, 4]);
		expect(bigger).to.deep.equal([6, 7, 8, 9, 10]);
		expect(nine).to.deep.equal([9]);
	});

	it('Should be privileged to all reduce arguments', () => {
		const [deduped, odd] = distribute(
			[1, 1, 2, 3, 4, 1, 3, 8],
			(item, index, array) => index === array.indexOf(item),
			i => i % 2
		);

		expect(deduped).to.deep.equal([1, 2, 3, 4, 8]);
		expect(odd).to.deep.equal([1, 1, 3, 1, 3]);
	});
});
