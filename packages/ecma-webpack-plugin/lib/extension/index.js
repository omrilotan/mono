const { extname } = require('path');

/**
 * Get file extension
 * @param  {string} filename
 * @return {string}
 */
module.exports = filename => extname(filename).replace(/^\.|\?.*/g, '');
