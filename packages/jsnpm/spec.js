const jsnpm = require('.');

describe('jsnpm', async() => {
	describe('exists', async() => {
		const {exists} = jsnpm;

		it('Should find if a package exists', async() =>
			expect(
				await exists('jsnpm'),
			).to.be.true,
		);
		it('Should find that a package does not exists', async() =>
			expect(
				await exists('ljaslkjasdnkldjas-09u2398u23uhe'),
			).to.be.false,
		);
		it('Should find if a tag exists', async() =>
			expect(
				await exists('jsnpm', 'latest'),
			).to.be.true,
		);
		it('Should find that a tag does not exists', async() =>
			expect(
				await exists('jsnpm', 'ljaslkjasdnkldjas'),
			).to.be.false,
		);
	});

	describe('latest', async() => {
		const {latest} = jsnpm;

		it('Should retrieve the latest version', async() => {
			expect(
				await latest('@(._.)/oooooo'),
			).to.equal('3.3.3');
		}).timeout(10000);
	});

	describe('publish', async() => {
		const {publish} = jsnpm;

		it('Should throw error when trying to publish', async() => {
			try {
				await publish();
				assert(false);
			}	catch (error) {
				expect(error.message).to.include('This package has been marked as private');
			}
		}).timeout(10000);
	});

	describe('versions', async() => {
		const {versions} = jsnpm;

		it('Should retrieve the latest version', async() => {
			expect(
				await versions('@(._.)/oooooo'),
			).to.deep.equal([
				'0.0.0',
				'1.1.1',
				'2.2.2',
				'3.3.3',
			]);
		}).timeout(10000);
	});
});

