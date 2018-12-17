const exec = require('async-execute');

/**
 * An item out of git show entry
 * @see https://git-scm.com/docs/git-show for placeholders
 * @param  {String} placeholder
 * @return {Promise<String>}
 */
module.exports = async placeholder => await exec(`git show -s --format=%${placeholder}`);
