const props = require('.');

describe('errobj/props', () => {
	it('Should extract property names from error', () => {
		const error = new Error('To err is humon');
		expect(props(error)).to.include('message');
	});
	it('Should attach default fields to error', () => {
		const error = new TypeError('To err is humon');
		expect(props(error)).to.include('name');
	});
	it('Should leave any other fields attached to error', () => {
		const error = new TypeError('To err is humon');
		error.property = 'balue';
		expect(props(error)).to.include('property');
	});
});
