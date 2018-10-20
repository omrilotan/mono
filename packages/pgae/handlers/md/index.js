const marked = require('marked');

/**
 * Convert markdown to HTML
 * @param  {String} content
 * @return {String}
 */
module.exports = async content => await marked(content, {});;
