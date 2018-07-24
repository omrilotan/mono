const execute = require('./');

describe('execute', async () => {
	it('Should return console output', async () =>
		expect(await execute('echo "Hello"')).to.equal('Hello')
	);

	it('Should return multi line answers', async () =>
		expect(await execute('echo "Hello\nthere"')).to.equal('Hello\nthere')
	);

	it('Should trim line breaks and white space from the edges', async () =>
		expect(await execute('echo "\n\n    Hello		\n\n     	 "')).to.equal('Hello')
	);

	it('Should always return a string', async () =>
		expect(await execute('echo "hello" > /dev/null')).to.be.a('string')
	);

	it('Should throw an error', async () => {
		let threw = false;
		let err;

		try {
			await execute('echo "message content" >&2 ; exit 125');

		} catch (error) {
			err = error;
			threw = true;
		}

		expect(err.exitCode).to.equal(125);
		expect(err.message).to.contain('message content');
		assert(threw, 'Should have thrown an error');
	});
});
