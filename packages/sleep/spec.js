const sleep = require('.');

describe('@lets/sleep', () => {
	it('should block the runtime for n milliseconds', () => {
		const start = Date.now();
		sleep(60);
		const end = Date.now();
		expect(end - start).to.be.above(58);
		expect(end - start).to.be.below(62);
	});
});
