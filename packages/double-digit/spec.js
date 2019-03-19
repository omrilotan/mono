const dd = require('.');

describe('double-digit', () => {
	[
		[0, '00'],
		[1, '01'],
		[9.9, '09.9'],
		[0.001, '00.001'],
		[1e3, '1000'],
	].forEach(([n, r]) => {
		it(
			`Should convert ${n} to ${r}`,
			() => expect(dd(n)).to.equal(r)
		);
		it(
			`${r} should represent ${n}`,
			() => expect(Number(r)).to.equal(n)
		);
	});
	[
		['2', '02'],
		['2.0001', '02.0001'],
		['12', '12'],
		['Hello', 'Hello'],
		[undefined, undefined],
		[false, false],
		[null, null],
		[Infinity, Infinity],
		[-Infinity, -Infinity],
	].forEach(([n, r]) => {
		it(
			`Should convert ${n} to ${r}`,
			() => expect(dd(n)).to.equal(r)
		);
	});
	it('Should not convert NaN', () => {
		const result = dd(NaN);
		expect(result).to.be.a('number');
		expect(Number.isNaN(result)).to.be.true;
	});
});
