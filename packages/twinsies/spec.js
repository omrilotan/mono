const {
	existsSync,
	readFileSync,
} = require('fs');

const interpolate = require('paraphrase')(/\${([^{}]*)}/g);
const execute = require('../async-execute');
const Twinsies = require('./');

const source = `${__dirname}/test-files/src/`;
const target = `${__dirname}/test-files/dist/`;


describe('Twinsies', async() => {
	let twinsies;

	beforeEach(async() => {
		await execute(`rm -rf ${target}`);

		// Verify target files have been removed
		if (existsSync(`${target}example.json`)) {
			throw new Error('Files have not been removed before test');
		}

		twinsies = new Twinsies({
			source,
			target,
			matches: [/.*\.json/],
			process: string => interpolate(string, {name: 'My Name', version: '1.2.3', testScript: 'npm test'}),
		});
	});

	afterEach(async() => {
		await execute(`rm -rf ${target}`);
		twinsies.unwatch();
	});

	it('creates an initial copy', done => {
		twinsies.register(verify).start();

		function verify() {
			assert(existsSync(`${target}example.json`));
			assert(existsSync(`${target}another/example.json`));
			done();
		}
	});

	it('Ignores unmatched files', done => {
		assert(existsSync(`${source}ignoreme.yml`));
		assert(!existsSync(`${target}ignoreme.yml`));

		twinsies.register(verify).start();

		function verify() {
			assert(!existsSync(`${target}ignoreme.yml`), 'ignoreme.yml was copied');
			done();
		}
	});

	it('Copies the contents of the files', done => {
		assert(!['example.json'].some(file => existsSync(`${target}${file}`)));
		twinsies.register(verify).start();

		function verify() {
			expect(
				readFileSync(`${target}another/example.json`).toString()
			).to.include('NESTED_FILE');
			done();
		}
	});

	it('processes the content of the files', done => {
		assert(!['example.json'].some(file => existsSync(`${target}${file}`)));
		twinsies.register(verify).start();

		function verify() {
			const content = readFileSync(`${target}example.json`).toString();
			expect(JSON.parse(content).name).to.equal('My Name');
			done();
		}
	});

	it('Reports to registered function', done => {
		twinsies.register(() => done()).start();
	});

	it('watches for file changes', done => {
		assert(!['changing.json'].some(file => existsSync(`${target}${file}`)));
		twinsies.register(verify).start();

		function verify() {
			const content = readFileSync(`${target}changing.json`).toString();
			expect(content).to.include('NOTHING');

			execute(`echo "SOMETHING" > ${target}changing.json`)
				.then(() => {
					const content = readFileSync(`${target}changing.json`).toString();
					expect(content).to.include('SOMETHING');
					done();
				});
		}
	});
});
