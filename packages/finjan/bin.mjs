import parser from 'yargs-parser';
import chalk from 'chalk';
import path from 'path';
import errobj from 'errobj';

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

const { green, red, bold, yellow } = chalk;
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
		errors.push(
			errobj(error, {origin: name})
		);
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

	if (errors.length) {
		console.log(
			...errors.map(
				({name, origin, message, fileName, lineNumber, columnNumber}) => `
${red.bold(name)}
  ${bold('in')}: ${red.bold(origin)}
  ${bold('at')}: ${yellow([fileName, lineNumber, columnNumber].join(':'))}
  ${message}
`
			)
		);
	}

	process.exit(errors.length);
})();
