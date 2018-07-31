const npm = require('.');
const util = process.binding('util');

describe('jsnpm/npm', async() => {
	it('Should expose a reusable promise', async() => {
		const instance = npm();

		expect(
			util.getPromiseDetails(instance)[0]
		).to.equal(
			util.kPending
		);

		await instance;

		expect(
			util.getPromiseDetails(instance)[0]
		).to.equal(
			util.kFulfilled
		);
	});
});
