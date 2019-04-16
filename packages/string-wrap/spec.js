const wrap = require('.');

describe('string-wrap', () => {
	it('Should wrap a string with things', () => {
		expect(wrap('hello', '[', ']')).to.equal('[hello]');
	});
	it('Should use "start" for "end" default', () => {
		expect(wrap('hello', '"')).to.equal('"hello"');
	});
	it('Should default to wrap with nothing', () => {
		expect(wrap('hello')).to.equal('hello');
	});
	it('Should convert input to string', () => {
		expect(wrap(1)).to.be.a('string');
		expect(wrap(null)).to.be.a('string');
		expect(wrap()).to.be.a('string');
	});
	it('Should convert input to string', () => {
		expect(wrap(1)).to.be.a('string');
		expect(wrap(/\w/)).to.be.a('string');
		expect(wrap({})).to.be.a('string');
		expect(wrap(new Set())).to.be.a('string');
		expect(wrap(null)).to.be.a('string');
		expect(wrap()).to.be.a('string');
	});
	it('Should treat undefined and null as nothing', () => {
		expect(wrap(null)).to.be.empty;
		expect(wrap(undefined)).to.be.empty;
		expect(wrap()).to.be.empty;
	});
});
