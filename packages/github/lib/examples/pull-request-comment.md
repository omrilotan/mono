Use the GitHub instance to create automated comments on pull requests

```js
const {GitHub} = require('@lets/GitHub');
const {join} = require('path');

/**
 * Create a pull request with the file and bundle stats comparison
 * @param  {String} options.token
 * @param  {String} options.owner
 * @param  {String} options.repo
 * @param  {String} options.pr
 * @param  {String} options.comment
 * @param  {String} [options.identifier]
 * @return {Object}
 * @example
 * await pullRequestComment({
 * 	token     : <{String} GITHUB_API_TOKEN>,
 * 	owner     : <{String} REPO_OWNER>,
 * 	repo      : <{String} REPO_NAME>,
 * 	pr        : <{Number} PR_NUMBER>,
 * 	comment   : <{String} CONTENT_OF_THE_COMMENT>,
 * 	identifier: <{String, optional} UNIQUE_IDENTIFIER>, // For updating a previously created comment
 * });
 */
module.exports = async function pull({token, owner, repo, pr, comment, identifier}) {
	const {request} = new GitHub({token});

	const comments = await request(
		safe('repos', owner, repo, 'issues', pr, 'comments')
	);

	const {id = ''} = identifier ? comments.find(
		comment => comment.body.includes(identify(identifier))
	) || {} : {};

	const url = id ?
		safe('repos', owner, repo, 'issues', 'comments', id) :
		safe('repos', owner, repo, 'issues', pr, 'comments');

	return await request(
		url,
		{
			method: id ? 'PATCH' : 'POST',
			body: JSON.stringify({
				body: [
					`<!-- ${UNIQUE_IDENTIFIER} -->`,
					comment,
				].join('\n'),
			}),
		}
	);
}

/**
 * Create a URL path (converts all types to string)
 * @param  {...Any} args
 * @return {String}
 */
const safe = (...args) => join(...args.map(i => i.toString()));

/**
 * Create a unique key by which we can identify the comment for later updates
 * @param  {String} identifier
 * @return {String}
 */
const identify = identifier => Buffer.from(identifier).toString('base64');
```
