const sample = require(".");

const samples = (n, l = 10) => new Array(l).fill(0).map(() => sample(n));

describe("sample-size", () => {
	it("Should never pass sample rate 0", () => {
		const results = samples(0);
		expect(results).not.to.contain(true);
	});
	it("Should always pass sample rate 1", () => {
		const results = samples(1);
		expect(results).not.to.contain(false);
	});
	it("Should pass only some", () => {
		const results = samples(0.5);
		expect(results)
			.to.contain(false)
			.and.to.contain(true);
	});
	[0.05, 0.2, 0.5, 0.8, 0.95].forEach(rate => {
		const margin = 0.025;
		const min = rate - margin;
		const max = rate + margin;

		const rangeDescription = `(between ${Math.round(
			min * 100
		)}% and ${Math.round(max * 100)}%)`;

		it(`Should sample about ${100 *
			rate}% for rate ${rate} ${rangeDescription}`, function() {
			this.retries(2);

			const size = 1000;
			const results = samples(rate, size).filter(Boolean);
			expect(results)
				.to.have.lengthOf.at.least(size * min)
				.and.to.have.lengthOf.at.most(size * max);
		});
	});
	it("Should sample an array", function() {
		this.retries(2);

		const filtered = new Array(100).fill(0).filter(() => sample(0.2));
		expect(filtered)
			.to.have.lengthOf.at.least(15)
			.and.to.have.lengthOf.at.most(25);
	});
});
