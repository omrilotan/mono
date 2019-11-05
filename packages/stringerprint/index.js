const { createHash } = require('crypto');

/**
 * Create hash digest (AKA fingerprint) from a given string
 * @param  {string} string
 * @return {string}
 */
module.exports = string => createHash('md5').update(string, 'utf8').digest('hex');
