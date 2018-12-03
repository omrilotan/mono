const chunkalyse = require('.');

describe('chunkalyse fixtures', () => {
	it('Should not mutate the original object', () => {
		const stats = require('./fixtures/emoji-picker-react.json');

		const before = JSON.stringify(stats);
		chunkalyse(stats);
		const after = JSON.stringify(stats);

		expect(before).to.equal(after);
	});

	[
		'emoji-picker-react',
	].forEach(
		fixture => {
			it(`[Degregation] Should match fixture stats with expected result for "${fixture}"`, () => {
				expect(
					chunkalyse(require(`./fixtures/${fixture}.json`))
				).to.deep.equal(
					require(`./fixtures/${fixture}.chunkalised.json`)
				);
			});
		}
	);

	[
		'butter-toast',
		'emoji-picker-react',
		'react-dates',
	].forEach(lib => {
		it(`Should calculate all the parts of the application to reach its sum (${lib})`, () => {
			const chunks = chunkalyse(require(`./fixtures/${lib}.json`));
			const summary = Object.values(chunks)[0];
			const sum = Object.values(summary.modules).map(v => v.size).reduce(
				(sum, i) => sum + i,
				0
			);
			expect(sum).to.equal(summary.size);

		});
	});
});

