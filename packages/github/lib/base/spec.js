const base = require('.');

describe('github/base', () => {
	it('Should add the protocol to relative URLs', () => {
		expect(base('topic/action')).to.equal('https://api.github.com/topic/action');
		expect(base('/topic/action')).to.equal('https://api.github.com/topic/action');
	});
	it('Should ignore full URLs', () => {
		expect(base('https://api.github.com/topic/action')).to.equal('https://api.github.com/topic/action');
		expect(base('https://api.gitlab.com/topic/action')).to.equal('https://api.gitlab.com/topic/action');
	});
});
