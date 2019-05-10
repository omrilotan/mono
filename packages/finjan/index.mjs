/* eslint-disable no-console */
import parser from 'yargs-parser';
import chalk from 'chalk';
import path from 'path';

const { join } = path;
const [, , ...rest] = process.argv;
const { _: files, require: required } = parser(rest);

const get = files => {
	files = typeof files === 'string'
		? [files]
		: files
	;

	return Promise.all(
		files.map(
			file => import(
				join(
					process.cwd(),
					file
				)
			)
		)
	);
};

const { green, red, bold } = chalk;
const collection = [];
const errors = [];

const describe = async (name, fn) => console.log(bold(name)) || await fn();
const it = (name, fn) => collection.push({name, fn});
Object.assign(global, { describe, it });

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

(async() => {
	required && await get(required);

	await get(files);

	while(collection.length) {
		const {name, fn} = collection.shift();
		await run(name, fn);
	}

	console.log('');
	const color = errors.length ? red : green;
	console.log(color(`Finished with ${errors.length} errors`));

	process.exit(errors.length);
})();
/* eslint-enable no-console */
