import chai from 'chai';
import chalk from 'chalk';

// import ES6 spec files here
import moduleScope from './packages/module-scope/spec.mjs';

const {green, red, bold} = chalk;
const collection = [];
const errors = [];

async function describe(name, fn) {
	console.log(bold(name));
	await fn();
}

function it(name, fn) {
	collection.push({name, fn});
}

async function run(name, fn) {
	try {
		await fn();
		console.log(green(` ✔︎ ${name}`));
	} catch (error) {
		console.log(red(` ✘ ${name}`));
		console.log(error.message);
		errors.push(error);
	}
}

Object.assign(
	global,
	chai,
	{describe, it}
);

(async() => {
	await moduleScope();
	while(collection.length) {
		const {name, fn} = collection.shift();
		await run(name, fn);
	}
	console.log('');

	process.exit(errors.length);
})();
