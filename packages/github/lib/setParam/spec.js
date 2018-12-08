const setParam = require('.');

describe('github/setParam', () => {
	it('Should add param when missing', () => {
		expect(
			setParam('https://api.github.com/topic/action?key=balue', 'page', 1)
		).to.equal(
			'https://api.github.com/topic/action?key=balue&page=1'
		);
	});
	it('Should replace existing param', () => {
		expect(
			setParam('https://api.github.com/topic/action?key=balue&page=1', 'page', 2)
		).to.equal(
			'https://api.github.com/topic/action?key=balue&page=2'
		);
	});
	it('Should leave existing param when no replacement specified', () => {
		expect(
			setParam('https://api.github.com/topic/action?key=balue&page=3')
		).to.equal(
			'https://api.github.com/topic/action?key=balue&page=3'
		);
		expect(
			setParam('https://api.github.com/topic/action?key=balue&page=3', 'page')
		).to.equal(
			'https://api.github.com/topic/action?key=balue&page=3'
		);
	});
});
