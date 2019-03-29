const {processors} = require('.');
const EXTENSIONS = require('./lib/extensions');

describe('eslint-plugin-log', () => {
	it(`Should expose processors for all filenames (${EXTENSIONS})`, () => {
		expect(processors).to.have.all.keys(EXTENSIONS);
	});
	Object.entries(processors).forEach(([key, processor]) => {
		it(`Should expose preprocess and postprocess function on ${key}`, () => {
			expect(processor).to.have.all.keys(['preprocess', 'postprocess']);
			expect(processor.preprocess).to.be.a('function');
			expect(processor.postprocess).to.be.a('function');
		});
	});
});
