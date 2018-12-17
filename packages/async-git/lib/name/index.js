const exec = require('async-execute');

/**
 * Get repository name
 * @return {Promise<String>}
 */
module.exports = exec.bind(null, 'basename -s .git `git config --get remote.origin.url`');
