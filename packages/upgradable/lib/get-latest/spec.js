const {version} = require('../../../oooooo/package.json');
const getLatest = require('.');

describe('latest-version', async() => {
	it('Should retrieve the latest version', async() => {
		const latest = await getLatest('@(._.)/oooooo');
		expect(latest).to.equal(version);
	}).timeout(10000);
});
