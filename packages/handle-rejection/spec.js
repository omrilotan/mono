const stubs = {};
let handle;

describe('handle-rejection', async() => {
	const on = process.on;
	const consoleerror = console.error;

	beforeEach(() => {
		process.on = (...args) => stubs.on(...args);
		console.error = (...args) => stubs.console(...args);
		stubs.on = () => null;
		delete require.cache[require.resolve('.')];
		handle = require('.');
	});

	after(() => {
		delete require.cache[require.resolve('.')];
		process.on = on;
		console.error = consoleerror;
	});
	it('Should call on multiple handlers', async() => {
		let consoled = false;
		let called = false;

		stubs.console = () => {
			consoled = true;
		}
		function custom() {
			called = true;
		}

		stubs.on = (name, fn) => fn();

		handle('console', custom);

		expect(called).to.be.true;
		expect(consoled).to.be.true;

	});
});
