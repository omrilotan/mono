const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');
const execute = require('async-execute');
const exist = require('@does/exist');

const FILENAME = 'dangerfile.js';
const primed = join(process.cwd(), FILENAME);

/**
 * Create a dangerfile if needed and run it
 * @param  {String}  sourcedir              Directory to look for dangerfile
 * @param  {Boolean} [optional.force=false] Prefer passed dir over process root
 * @return {String}
 */
module.exports = async function dangerfile(sourcedir, { force = false } = {}) {

	// Check is a local file exists *unless* false flag is on
	const exists = force
		? false
		: await exist(primed)
	;
	let message = 'Using the existing Dangerfile';

	// Create dangerfile only if local one is not available
	if (!exists) {
		message = await create(sourcedir);
	}

	// Run danger
	const installed = await run();

	return installed
		? [ 'Installed danger.', message ].join(' ')
		: message
	;
};

/**
 * Create a dangerfile
 * @param  {String} target [description]
 * @return {[type]}        [description]
 */
async function create(sourcedir) {
	const target = join(sourcedir, FILENAME);
	const exists = await exist(target);

	const source = exists
		? target
		: join(__dirname, FILENAME)
	;

	const content = await readFile(source);
	await writeFile(primed, content.toString());

	return exists
		?	'Creating a new Dangerfile'
		: 'Creating a default Dangerfile'
	;
}

/**
 * Install danger and run it
 * @return {Boolean}
 */
async function run() {
	try {
		await execute('./node_modules/.bin/danger ci', { pipe: true });
		return false;
	} catch (error) {
		// don't throw yet
	}

	await execute('npm i danger --no-save', { pipe: true });
	await execute('./node_modules/.bin/danger ci', { pipe: true });
	return true;
}
