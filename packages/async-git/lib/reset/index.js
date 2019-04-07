const exec = require('async-execute');

/**
 * Reset current HEAD to the specified state
 * @param  {String}  sha
 * @param  {Boolean} options.hard
 * no return value
 */
module.exports = async function(sha, {hard = true} = {}) {
	if (typeof sha === 'string') {
		return await exec(`git reset ${sha} ${hard ? '--hard' : ''}`);
	}

	throw new TypeError(`No case for handling, sha ${sha} (${typeof sha})`);
};
