const { clean, override } = abuser(__filename);

const compiler = {
	hooks: {
		emit: {
			tapPromise: fake(),
		},
	},
};

const compilation = {
	assets: [],
};
const errors = fake.returns('Some Errors');
const message = fake.returns(false);

describe('ecma-webpack-plugin', () => {
	let EcmaPlugin;
	before(() => {
		override('./lib/errors', errors);
		override('./lib/message', message);
		EcmaPlugin = require('.');
	});
	afterEach(() => {
		errors.resetHistory();
		message.resetHistory();
		compiler.hooks.emit.tapPromise.resetHistory();
	});
	after(() => clean('.'));

	it('Should set default options', () => {
		const plugin = new EcmaPlugin();

		expect(plugin.options.extensions).to.deep.equal([ 'js', 'mjs' ]);
	});
	it('Should register with tapPromise', () => {
		const plugin = new EcmaPlugin();
		plugin.apply(compiler);

		const [ [ name, callback ] ] = compiler.hooks.emit.tapPromise.args;

		expect(name).to.equal('EcmaPlugin');
		expect(callback).to.be.a('function');
	});
	it('Should return a promise to the callback', () => {
		const plugin = new EcmaPlugin();
		plugin.apply(compiler);

		const [ [ , callback ] ] = compiler.hooks.emit.tapPromise.args;

		expect(callback(compilation)).to.be.an.instanceof(Promise);
	});
	it('Should call on message with results from errors', async() => {
		const plugin = new EcmaPlugin();
		plugin.apply(compiler);

		const [ [ , callback ] ] = compiler.hooks.emit.tapPromise.args;
		await callback(compilation);

		expect(errors).to.have.been.calledOnce;
		expect(message).to.have.been.calledWith('Some Errors');
	});
});
