let postprocess;
const logs = [];

describe('eslint-plugin-log/log', () => {
	const {log} = console;
	const {cwd} = process;
	before(() => {
		delete require.cache[require.resolve('.')];
		console.log = function(...args) {
			logs.push(...args);
			return log.apply(this, args);
		};
		process.cwd = () => '/workspace/project';
		postprocess = require('.');
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
			postprocess([ [] ], 'file name');
			const [one, two] = logs;
			expect(one).to.equal('Linting:');
			expect(two).to.include('1');
			expect(two).to.include('file name');
		});
		it('Should skip subsequent counts of same file', () => {
			postprocess([ [ 'message' ] ], 'file name');
			expect(logs).to.be.empty;
		});
		it('Should continue to count numbered filename', () => {
			postprocess([ [] ], 'file name 2');
			const [log] = logs;
			expect(log).to.include('2');
			expect(log).to.include('file name');
		});
		it('Should omit the execution path from filename', async() => {
			postprocess([ [] ], '/workspace/project/filename.js');
			const [log] = logs;
			expect(log).to.include(' /filename.js');
			expect(log).to.not.include('workspace/project');
		});
		it('Should mark with V when there are no messages', async() => {
			postprocess([ [] ], '/workspace/project/filename2.js');
			const [log] = logs;
			expect(log).to.include('✔︎');
		});
		it('Should mark with X when there are any messages', async() => {
			postprocess([ [ 'something' ] ], '/workspace/project/filename3.js');
			const [log] = logs;
			expect(log).to.include('✘');
		});
		it('Should finish with total files linted', async() => {
			await wait(80);
			const [log] = logs;
			expect(log).to.include('5 files linted.');
		});
	}
});
