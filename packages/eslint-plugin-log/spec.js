let processors;
let shouldSkip = false;

/**
 * Mock e module's exports
 * @param  {String} _module  Module route
 * @param  {Any}    _exports Anything you'd like that module to export
 * @return {Any}             The module's exports
 */
function mock(_module, _exports) {
	delete require.cache[require.resolve(_module)];
	require(_module);
	_exports && (require.cache[require.resolve(_module)].exports = _exports);
	return require(_module);
}

describe('eslint-plugin-log', () => {
	before(() => {
		mock('./lib/extensions', ['a', 'b', 'c']);
		mock('./lib/skip', () => shouldSkip);
		({processors} = require('.'));
	});
	beforeEach(() => {
		shouldSkip = false;
	});
	after(() => ['./lib/extensions', './lib/skip', '.'].forEach(i => mock(i)));

	it('Should expose processors for all extensions', () => {
		expect(processors).to.have.all.keys(['a', 'b', 'c']);
	});
	it('Should expose preprocess and postprocess function on each processor', () => {
		Object.values(processors).forEach(processor => {
			expect(processor).to.have.all.keys(['preprocess', 'postprocess', 'supportsAutofix']);
			expect(processor.preprocess).to.be.a('function');
			expect(processor.postprocess).to.be.a('function');
			expect(processor.supportsAutofix).to.be.true;
		});
	});
	it('Should expose log preprocess when "shouldSkip" is false', () => {
		shouldSkip = false;
		const {processors} = mock('.');
		expect(processors.a.preprocess).to.equal(require('./lib/log'));
	});
	it('Should expose noop preprocess when "shouldSkip" is true', () => {
		shouldSkip = true;
		const {processors} = mock('.');
		expect(processors.a.preprocess).to.equal(require('./lib/preprocess'));
	});
});
