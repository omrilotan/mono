const exec = require('async-execute');

/**
 * Create and push a git tag with the last commit message
 * @param  {String} tag [description]
 * no return value
 */
module.exports = async function(tag) {
	if (!tag || !['string', 'number'].includes(typeof tag)) {
		throw new TypeError(`string was expected, instead got ${tag}`);
	}

	const { message, author, email } = this;

	try {
		await Promise.all([
			exec(`git config user.name "${await author}"`),
			exec(`git config user.email "${await email}"`),
		]);
		await exec(`git tag -a ${tag} -m "${await message}"`);
		await exec(`git push origin refs/tags/${tag}`);
	} catch (error) {
		throw error;
	}
};
