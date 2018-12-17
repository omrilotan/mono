const exec = require('async-execute');

/**
 * Get current branch
 * @return {Promise<String>}
 */
module.exports = exec.bind(null, 'git rev-parse --abbrev-ref HEAD');
