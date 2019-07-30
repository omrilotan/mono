let postprocess;
let fakes = {};
const logs = [];

describe('eslint-plugin-log/log', () => {
	const {log} = console;
	const {cwd} = process;
	before(() => {
		delete require.cache[require.resolve('.')];
		delete require.cache[require.resolve('../mark')];
		require('../mark');
		require.cache[require.resolve('../mark')].exports = function(messages) {
			fakes.mark = messages;
			return [str => str, '•'];
		};
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
	afterEach(() => {
		delete fakes.mark;
	});
	after(() => {
		console.log = log;
		process.cwd = cwd;
		delete require.cache[require.resolve('.')];
		delete require.cache[require.resolve('../mark')];
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
		it('Should print the result of mark function', async() => {
			postprocess([ [] ], '/workspace/project/filename2.js');
			const [log] = logs;
			expect(log).to.include('•');
		});
		it('Should call mark with messages', async() => {
			postprocess([ [ 'something' ] ], '/workspace/project/filename3.js');
			expect(fakes.mark).to.deep.equal(['something']);
		});
		it('Should finish with total files linted', async() => {
			await wait(80);
			const [log] = logs;
			expect(log).to.include('5 files linted.');
		});
	}
});
