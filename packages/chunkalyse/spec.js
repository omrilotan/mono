const chunkalyse = require('.');

const FIXTURES = [
	'butter-toast',
	'emoji-picker-react',
	'react-dates',
];

describe('chunkalyse fixtures', () => {
	it('Should not mutate the original object', () => {
		const stats = require(`./fixtures/${FIXTURES[0]}.json`);

		const before = JSON.stringify(stats);
		chunkalyse(stats);
		const after = JSON.stringify(stats);

		expect(before).to.equal(after);
	});

	FIXTURES.forEach(
		fixture => {
			it(`[Degregation] Should match fixture stats with expected result for "${fixture}"`, () => {
				expect(
					chunkalyse(require(`./fixtures/${fixture}.json`)),
				).to.deep.equal(
					require(`./fixtures/${fixture}.chunkalised.json`),
				);
			});
		},
	);

	FIXTURES.forEach(lib => {
		describe(`Application size and modules size (${lib})`, () => {
			const results = chunkalyse(require(`./fixtures/${lib}.json`));

			Object.entries(results).forEach(
				([ name, { size, modules } ]) =>
				{
					it(`Should reach full application size by modules sizes (${lib}/${name})`, () => {
						const sum = Object.values(modules)
							.map(({ size }) => size).reduce(
								(sum, i) => sum + i,
								0,
							);
						expect(sum).to.equal(size);
					});
				},
			);

		});
	});
});

