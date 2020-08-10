let getOwnPropertySymbols;

describe('assign/getOwnPropertySymbols', () => {
	const original = Object.getOwnPropertySymbols;
	beforeEach(() => {
		delete require.cache[require.resolve('.')];
	});
	after(() => {
		Object.getOwnPropertySymbols = original;
	});
	it('Should get object property symbols', () => {
		getOwnPropertySymbols = require('.');

		const key = Symbol();
		const obj = {
			[key]: 'value',
			otherkey: 'othervalue',
		};
		const symbols = getOwnPropertySymbols(obj);
		expect(symbols).to.have.lengthOf(1);
		expect(obj[symbols[0]]).to.equal('value');
	});
	it('Should return an empty list if getOwnPropertySymbols is not available', () => {
		delete Object.getOwnPropertySymbols;

		const key = Symbol();
		const obj = { [key]: 'value' };
		const symbols = getOwnPropertySymbols(obj);
		expect(symbols).to.have.lengthOf(0);
	});
});
