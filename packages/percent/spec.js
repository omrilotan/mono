const percent = require('.');

describe('percent', () => {
	it('Should calculate the percentage', () => {
		expect(percent(150, 200)).to.equal(75);
		expect(percent(250, 200)).to.equal(125);
	});
	it('Should return 0 when part is 0', () => {
		expect(percent(0, 200)).to.equal(0);
	});
	it('Should return 1000 when whole is 0', () => {
		expect(percent(200, 0)).to.equal(100);
	});
	it('Should return 0 when both are 0', () => {
		expect(percent(0, 0)).to.equal(0);
	});
	it('Should return a whole number', () => {
		expect(percent(201, 200)).to.equal(100);
	});
	it('Should round correctly', () => {
		expect(percent(234183, 234194)).to.equal(100);
	});
});
