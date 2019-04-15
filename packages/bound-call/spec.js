const bound = require('.');

describe('bound-call', () => {
	it('Should bind String\'s toLowerCase from prototype', () => {
		const toLowerCase = bound(String.prototype, 'toLowerCase');
		expect(toLowerCase('Hello')).to.equal('hello');
	});
	it('Should bind array join from instance', () => {
		const join = bound([], 'join');
		expect(join([1, 2, 3], '+')).to.equal('1+2+3');
	});
});
