const assignSymbols = require('.');

describe('assign/assignSymbols', () => {
	it('Should assign second object symbols to first', () => {
		const a = Symbol();
		const b = Symbol();
		const target = { [a]: 'a' };
		assignSymbols(target, { [b]: 'b' });
		expect(Object.getOwnPropertySymbols(target)).to.have.lengthOf(2);
		expect(target[b]).to.equal('b');
	});
});
