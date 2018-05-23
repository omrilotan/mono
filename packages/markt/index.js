const {promisify} = require('util');
const marked = promisify(require('marked'));
const phrase = require('paraphrase/double');

/**
 * [description]
 * @param  {String} content Markdown content
 * @param  {String} [args.template]
 * @param  {String} [args[name]] To be replaced in the template
 * @return {String}
 *
 * @example
 * markt('# This is a title\n`this is code`', {
 *   template: '<body>{{ content }}<footer>{{ something_else }}</footer></body>',
 *   something_else: 'This is the signature or something'
 * })
 *
 * // <body><h1>This is a title</h1><code>this is code</code><footer>This is the signature or something</footer></body>
 */
module.exports = async function(content, args = {}) {
    if (typeof args === 'string') {
        args = {template: args};
    }

    const { template = '{{content}}' } = args;

    args.content = (await marked(content, {})).trim();

    return phrase(template, args);
}
