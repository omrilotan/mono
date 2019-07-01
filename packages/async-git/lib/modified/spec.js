let modified;

describe('async-git:modified', async() => {

	before(() => {
		delete require.cache[require.resolve('.')];
		delete require.cache[require.resolve('async-execute')];
		modified = require('.');
	});

	it('Should get the date of the last date a certain file was changes', async() => {
		const date = await modified('./packagess/async-git/index.js');

		console.log(date);
		expect(date).to.be.a('date');
	});
});
