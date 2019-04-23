const count = require('.');

describe('count', () => {
	it('Should count', () => {
		expect(count()).to.equal('1st');
		expect(count()).to.equal('2nd');
	});
	it('Should continue to count', () => {
		expect(count()).to.equal('3rd');
		expect(count()).to.equal('4th');
	});
	it('Should reset to 0', () => {
		expect(count()).to.equal('5th');
		count.reset();
		expect(count()).to.equal('1st');
	});
	it('Should set to given number', () => {
		expect(count()).to.equal('2nd');
		count.set(6);
		expect(count()).to.equal('7th');
	});
	it('Should start from given number', () => {
		expect(count()).to.equal('8th');
		expect(count.from(6)).to.equal('7th');
	});
	it('Should count down', () => {
		expect(count.down()).to.equal('6th');
		expect(count.down()).to.equal('5th');
	});
	it('Should count negative numbers', () => {
		count.reset();
		expect(count.down()).to.equal('-1st');
		expect(count.down()).to.equal('-2nd');
	});
});
