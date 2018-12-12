const wait = require('.');

describe('@lets/wait', async() => {
	it('Should wait', async() => {
		const start = Date.now();
		await wait(100);
		const duration = Date.now() - start;
		expect(duration).to.be.at.least(100);
	});
});
