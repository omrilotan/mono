const moon = require('.');

const {
	ICONS,
	CODES,
	NAMES,
} = moon;

describe('moon', async() => {
	it(
		'Should return a moon phase',
		() => expect(moon()).to.be.oneOf(ICONS)
	);

	[
		[{format: 'code'}],
		[2019, {format: 'code'}],
		[2019, 1, {format: 'code'}],
		[2019, 1, 1, {format: 'code'}],
	].forEach(args => it(
		`Should return a moon phase name (${args.map(JSON.stringify).join(', ')})`,
		() => expect(moon(...args)).to.be.oneOf(CODES)
	));

	[
		[1939, 3, 24, CODES[1]],
		[1943, 7, 18, CODES[4]],
		[1976, 4, 14, CODES[4]],
		[1985, 5, 8, CODES[5]],
		[1989, 11, 24, CODES[7]],
		[1990, 2, 26, CODES[0]],
		[1992, 6, 24, CODES[6]],
		[1993, 8, 8, CODES[5]],
	].forEach(([year, month, date, result]) => it(
		`Should moon phase for ${[year, month, date].join('-')} is ${result}`,
		() => expect(moon(year, month, date, {format: 'code'})).to.equal(result)
	));

	it('Should expose all phase collections', () => {
		expect(ICONS[0]).to.equal('🌑');
		expect(CODES[0]).to.equal('new');
		expect(NAMES[0]).to.equal('New Moon');
	});

	it('Should expose all phase formats', () => {
		expect(moon.FORMATS).to.deep.equal(['icon', 'code', 'name']);
	});

	[
		['icon', ICONS],
		['code', CODES],
		['name', NAMES],
	].forEach(([format, array]) => it(
		`Should return a format:${format}`,
		() => expect(moon({format})).to.be.oneOf(array)
	));
});
