const { join } = require('path');
const exist = require('.');

describe('@does/exist', async () => {
	it('Should return true when a file is there', async () => {
		const file = join(__dirname, 'index.js');
		expect(await exist(file)).to.be.true;
	});

	it('Should return false when a file is missing', async () => {
		const file = join(__dirname, 'not.here');
		expect(await exist(file)).to.be.false;
	});
});
