const {promisify} = require('util');
const marked = promisify(require('marked'));

module.exports = async function(markdown, template = '{{content}}') {
    const content = await marked(markdown, {});

    return template.replace(/{{(\s*?)content(\s*?)}}/i, content.trim());
}
