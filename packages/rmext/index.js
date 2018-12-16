const { extname } = require('path');

/**
 * Remove file extension
 * @param  {String} name
 * @return {String}
 */
module.exports = name => name.replace(new RegExp(extname(name) + '$'), '');
