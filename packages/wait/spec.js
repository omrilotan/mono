const wait = require('.');

describe('@lets/wait', async function() {
	this.retries(2);
	it('Should wait', async() => {
		const start = Date.now();
		await wait(100);
		const duration = Date.now() - start;
		expect(duration).to.be.at.least(100);
		expect(duration).to.be.below(111);
	});
});
