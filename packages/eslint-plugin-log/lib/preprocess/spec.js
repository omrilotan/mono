let preprocess;
const logs = [];

describe('eslint-plugin-log/preprocess', () => {
	const {log} = console;
	const {cwd} = process;
	before(() => {
		delete require.cache[require.resolve('.')];
		console.log = function(...args) {
			logs.push(...args);
			return log.apply(this, args);
		};
		process.cwd = () => '/workspace/project';
		preprocess = require('.');
	});
	beforeEach(() => {
		logs.length = 0;
	});
	after(() => {
		console.log = log;
		process.cwd = cwd;
		delete require.cache[require.resolve('.')];
	});
	{
		it('Should start with "Linting" title and first numbered file', () => {
			preprocess('message', 'file name');
			const [one, two] = logs;
			expect(one).to.equal('Linting:');
			expect(two).to.equal('1. file name');
		});
		it('Should continue to count numbered filename', () => {
			preprocess('message', 'file name');
			const [log] = logs;
			expect(log).to.equal('2. file name');
		});
		it('Should omit the execution path from filename', async() => {
			preprocess('message', '/workspace/project/filename.js');
			const [log] = logs;
			expect(log).to.equal('3. /filename.js');
		});
		it('Should finish with total files linted', async() => {
			await sleep(80);
			const [log] = logs;
			expect(log).to.equal('3 files linted.');
		});
	}
});
