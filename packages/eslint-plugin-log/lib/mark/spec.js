const { red, green, yellow } = require('chalk');
const mark = require('.');

describe('lib/mark', () => {
	it('Should return green check-mark when no messages are passed', () => {
		const [color, sign] = mark([]);
		expect(color('a')).to.equal(green('a'));
		expect(sign).to.equal('✔︎');
	});
	it('Should return red X when and message has an error', () => {
		const [color, sign] = mark([{severity: 1}, {severity: 2}]);
		expect(color('a')).to.equal(red('a'));
		expect(sign).to.equal('✘');
	});
	it('Should return yellow triangle when and message has an error', () => {
		const [color, sign] = mark([{severity: 1}, {severity: 1}]);
		expect(color('a')).to.equal(yellow('a'));
		expect(sign).to.equal('▲');
	});
});
