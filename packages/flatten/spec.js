const flatten = require('.');

describe('flatten', () => {
	it('Should flatten an array of arrays nested array', () => {
		expect(flatten(
			[
				[ 1, 2, 3 ],
				[ 1, 2, 3 ],
				[ 1, 2, 3 ],
			],
		)).to.deep.equal(
			[ 1, 2, 3, 1, 2, 3, 1, 2, 3 ],
		);
	});
	it('Should flatten nested array of arrays nested array', () => {
		expect(flatten(
			[
				[
					[ 1, 2, 3 ],
					[ 4, 5, 6 ],
				],
				[
					[ 1, 2, 3 ],
					[ 4, 5, 6 ],
				],
				[
					[ 1, 2, 3 ],
					[ 4, 5, 6 ],
				],
			],
		)).to.deep.equal(
			[ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6 ],
		);
	});
	it('Should leave an array of mixed items as is', () => {
		expect(flatten(
			[
				[ 1, 2, 3 ],
				[ 1, 2, 3 ],
				'a',
			],
		)).to.deep.equal(
			[
				[ 1, 2, 3 ],
				[ 1, 2, 3 ],
				'a',
			],
		);
	});
	it('Should avoid endless recursion', () => {
		expect(() => flatten([])).to.not.throw();
	});
	it('Should flatten empty arrays', () => {
		expect(flatten([ [], [] ])).to.deep.equal([]);
	});
});
