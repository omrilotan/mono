const execute = require('./');

describe('execute', async () => {
	const {write: stdout} = process.stdout;
	const {write: stderr} = process.stderr;
	afterEach(() => {
		process.stdout.write = stdout;
		process.stderr.write = stderr;
	});

	it('Should return console output', async () =>
		expect(await execute('echo "Hello"')).to.equal('Hello'),
	);

	it('Should return multi line answers', async () =>
		expect(await execute('echo "Hello\nthere"')).to.equal('Hello\nthere'),
	);

	it('Should trim line breaks and white space from the edges', async () =>
		expect(await execute('echo "\n\n    Hello		\n\n     	 "')).to.equal('Hello'),
	);

	it('Should always return a string', async () =>
		expect(await execute('echo "hello" > /dev/null')).to.be.a('string'),
	);

	it('Should pass the exit code', async() => {
		let code = 0;

		try {
			await execute('exit 14');
		} catch (error) {
			code = error.code;
		}

		expect(code).to.equal(14);
	});

	it('Should pipe output', async () => {
		let called = 0;
		process.stdout.write = function(...args) {
			++called;
			stdout.apply(this, args);
		};

		const code = 'node -p "console.log(\'one\'); setTimeout(console.log, 100, \'two\'); \'end\'"';
		const result = await execute(code, {pipe: true});
		expect(called).to.be.at.least(2).and.at.most(3);
		expect(result).to.equal('one\nend\ntwo');
	});

	it('Should pipe stderr', async () => {
		let called = 0;
		let outputs = [];
		process.stderr.write = function(...args) {
			outputs.push(...args);
			++called;
			stderr.apply(this, args);
		};

		const code = 'node -p "process.stderr.write(\'one\'); \'end\'"';
		const result = await execute(code, {pipe: true});
		expect(called).to.equal(1);
		expect(outputs).to.deep.equal(['one']);
		expect(result).to.equal('end');
	});

	it('Should throw an error', async () => {
		let threw = false;
		let err;
		const cmd = 'echo "message content" >&2 ; exit 125';

		try {
			await execute(cmd);

		} catch (error) {
			err = error;
			threw = true;
		}

		expect(err.exitCode).to.equal(125);
		expect(err.code).to.equal(125);
		expect(err.cmd).to.equal(cmd);
		expect(err.message).to.contain('message content');
		assert(threw, 'Should have thrown an error');
	});
});
