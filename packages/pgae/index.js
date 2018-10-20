process.on('unhandledRejection', error => console.error(error));

const {readdir, readFile, writeFile, stat} = require('fs').promises;
const {basename, join} = require('path');
const read = async file => (await readFile(file)).toString();
const phrase = require('paraphrase/double');
const reduce = require('await-reduce');

const handlers = require('./handlers');

/**
 * [description]
 * @param  {String} [options.template]
 * @param  {String} [options.sources]
 * @param  {String} [options.destination]
 * @return {void}
 */
module.exports = async ({
	template = './template.html',
	sources = './sources',
	destination = './docs/index.html',
}) => {
	writeFile(
		destination,
		convert(
			await read(template),
			await collectFilesData({dir: sources, origin: sources})
		)
	);
};

/**
 * Convert pattern matches to data entry values
 * @param  {String} input
 * @param  {Object} data
 * @return {String}
 */
function convert(input = '', data) {
	const [pattern] = phrase.patterns;
	let last;

	while(pattern.test(input)) {
		if (last === input) {
			throw new Error(`Missing data for keys: ${input.match(pattern).join(', ')}`);
		}

		last = input;
		input = phrase(input, data);
	}
	return input;
}

/**
 * Convert file tree to key-value object
 * @param  {String} options.dir
 * @param  {Object} options.accumulator
 * @param  {String} origin
 * @return {Object}
 */
async function collectFilesData({dir, accumulator = {}, origin = ''}) {
	return await reduce(
		(await readdir(dir)).filter(name => !name.startsWith('.')),
		async(accumulator, item) => {
			const file = join(dir, item);
			const stats = await stat(file);

			if (stats.isDirectory()) {
				return await collectFilesData({dir: file, accumulator, origin});
			}

			return Object.assign(
				accumulator,
				{
					[key(file, origin)]: (await (async() => {
						const content = await read(file);
						const type = item.split('.').pop();
						const handler = handlers[type];

						return typeof handler === 'function'
							?
							await handler(content)
							:
							content;
					})()).trim()
				}
			)
		},
		accumulator
	);
}

/**
 * Get the name of a file without extension, and without "origin" directory
 * @param  {String} file
 * @param  {String} origin
 * @return {String}
 */
function key(file, origin = '') {
	const route = file.split('/')
	if (route[0] === basename(origin)) {
		route.shift();
	}
	return join(...route).replace(/.(\w*)$/, '')
}
