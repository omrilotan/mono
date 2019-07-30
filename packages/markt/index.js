const {promisify} = require('util');
const read = promisify(require('fs').readFile);
const {resolve} = require('path');
const marked = promisify(require('marked'));
const paraphrase = require('paraphrase');

const DEFAULT_TEMPLATE = '{{content}}';

const phrase = paraphrase(/{{([^{}]*)}}/gm, {clean: true});

/**
 * [description]
 * @param	{String} content Markdown content
 * @param	{String} [options[name]] To be replaced in the template
 * @param	{String} [options.template]
 * @param	{String} [options.content]
 * @param	{String} [options.preset]
 * @return {String}
 *
 * @example
 * markt('# This is a title\n`this is code`', {
 *	 template: '<body>{{ content }}<footer>{{ something_else }}</footer></body>',
 *	 something_else: 'This is the signature or something'
 * })
 *
 * // <body><h1>This is a title</h1><code>this is code</code><footer>This is the signature or something</footer></body>
 */
module.exports = async function(content, options = {}) {
	if (typeof options === 'string') {
		options = {template: options};
	}

	const template = await getTemplate(options);

	options.content = (await marked(content, {})).trim();

	return phrase(template, options);
};

/**
 * Get a template string (work through the hierarchy)
 * @param  {String} [options.template] Template string
 * @param  {String} [options.preset]   File name
 * @return {String}
 */
async function getTemplate({template, preset}) {
	if (typeof template === 'string') {
		return template;
	}

	if (typeof preset === 'string') {
		try {
			return (
				await read(
					resolve(
						__dirname,
						'templates',
						[preset.toLowerCase(), 'html'].join('.'),
					)
				)
			).toString();
		} catch (error) {
			throw new Error(`Preset ${preset} not found`);
		}
	}

	return DEFAULT_TEMPLATE;
}
