const levelheaded = require('.');

describe('levelheaded', () => {
	const log = console.log;
	afterEach(() => {
		console.log = log;
	});
	it('Should execute "action" by level', () => {
		let result;
		const tester = levelheaded({
			levels: ['a', 'b', 'c'],
			minimal: 'b',
			action: (...args) => { result = args; },
		});

		tester.a('A');
		expect(result).not.to.deep.equal(['A']);
		tester.b('B');
		expect(result).to.deep.equal(['B']);
		tester.c('C');
		expect(result).to.deep.equal(['C']);
	});
	it('Should use log levels by default', () => {
		let result;
		console.log = (...args) => {
			result = args;
			return log(...args);
		}

		const tester = levelheaded();
		tester.info('done');
		expect(result).to.deep.equal(['done']);
	});
	it('Should run on an object context containing current log level', () => {
		let result;
		const tester = levelheaded({action: function() {
			result = this;
		}});
		tester.warn('somwthing');
		expect(result.level).to.equal('warn');
	});
	it('Should expose default level methods', () => {
		const tester = levelheaded();
		[
			tester.debug,
			tester.verbose,
			tester.info,
			tester.warn,
			tester.error,
			tester.critical,
		].forEach(fn => expect(fn).to.be.a('function'));
	});
});
