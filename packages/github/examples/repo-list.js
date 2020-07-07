/**
 * Get paginated data in one go
 */

const GitHub = require('../');

/**
 * Get list of repositories owned by me (token owner)
 * @param  {String} token
 * @return {String[]}
 *
 * @example
 * const repos = await myRepos(process.env.GITHUB_API_TOKEN);
 */
module.exports = async function myRepos(token) {
	const { paged } = new GitHub({ token });
	const result = await paged('user/repos?sort=updated');

	return result.map(
		({ name }) => name,
	);
};
