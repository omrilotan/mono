const moon = require('.');
const {
	PHASES,
	PHASES_CODES,
} = moon;

describe('moon', async() => {
	it('Should return a moon phase', () => {
		expect(moon()).to.be.oneOf(PHASES);
	});
	it('Should return a moon phase name', () => {
		expect(moon({format: 'code'})).to.be.oneOf(PHASES_CODES);
		expect(moon(2019, {format: 'code'})).to.be.oneOf(PHASES_CODES);
		expect(moon(2019, 1, {format: 'code'})).to.be.oneOf(PHASES_CODES);
		expect(moon(2019, 1, 1, {format: 'code'})).to.be.oneOf(PHASES_CODES);
	});

	[
		[1939, 3, 24, PHASES_CODES[1]],
		[1943, 7, 18, PHASES_CODES[4]],
		[1976, 4, 14, PHASES_CODES[4]],
		[1985, 5, 8, PHASES_CODES[5]],
		[1989, 11, 24, PHASES_CODES[7]],
		[1990, 2, 26, PHASES_CODES[0]],
		[1992, 6, 24, PHASES_CODES[6]],
		[1993, 8, 8, PHASES_CODES[5]],
	].forEach(([year, month, date, result]) => {
		it(`Should moon phase for ${[year, month, date].join('-')} is ${result}`, () => {
			expect(moon(year, month, date, {format: 'code'})).to.equal(result);
		});
	})

	it('exposes phase formats', () => {
		expect(moon.PHASES[0]).to.equal('🌑');
		expect(moon.PHASES_CODES[0]).to.equal('new');
		expect(moon.PHASES_NAMES[0]).to.equal('New Moon');
	});
});
