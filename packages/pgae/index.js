process.on('unhandledRejection', error => console.error(error));

const {readdir, readFile, writeFile} = require('fs').promises;
const read = async file => (await readFile(file)).toString();
const phrase = require('paraphrase/double');
const reduce = require('await-reduce');
const marked = require('marked');

const {
	tocss,
	tojs,
} = require('./lib');

/**
 * [description]
 * @param  {String} [options.template]    [description]
 * @param  {String} [options.sources]     [description]
 * @param  {String} [options.destination] [description]
 * @return {void}
 */
module.exports = async ({
	template = './template.html',
	sources = './sources',
	destination = './docs/index.html',
}) => {
	const tmpl = await read(template);

	const data = await reduce(
		(await readdir(sources)).filter(name => !name.startsWith('.')),
		async(accumulator, item) => Object.assign(
			accumulator,
			{
				[item.replace(/^\d-/, '').replace(/.(\w*)$/, '')]: (await (async() => {
					const content = await read(`${sources}/${item}`);
					switch (item.split('.').pop()) {
						case 'md':
							return await marked(content, {});
						case 'js':
// console.log(content, tojs(content))
							return tojs(content);
						case 'scss':
							return await tocss(content);
						default:
							return content;
					}
				})()).trim()
			}
		),
		{}
	);

	writeFile(
		destination,
		phrase(tmpl, data)
	);
};
