const row = require('.');

describe('markdownise/row', () => {
	it('Should create a markdown row', () => {
		expect(row([ 'a', 'b' ])).to.equal('| a | b');
	});
	it('Should create empty cells for undefined and null values', () => {
		expect(row([ 'a', undefined, 'c' ])).to.equal('| a | | c');
	});
	it('Should print falsy values values', () => {
		expect(row([ 'a', false, 'c' ])).to.equal('| a | false | c');
		expect(row([ 'a', 0, 'c' ])).to.equal('| a | 0 | c');
		expect(row([ 'a', '', 'c' ])).to.equal('| a |  | c');
	});
});
