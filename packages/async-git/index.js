const exec = require('async-execute');

const formats = [
	['author'  , 'an'],
	['comitter', 'cn'],
	['email'   , 'ae'],
	['sha'     , 'H' ],
	['short'   , 'h' ],
	['subject' , 's' ],
	['message' , 'B' ],
	['body'    , 'b' ],
];

const show = async item => await exec(`git show -s --format=%${item}`);

const getters = Object.assign(
	{
		name: exec.bind(null, 'basename -s .git `git config --get remote.origin.url`'),
		branch: exec.bind(null, 'git rev-parse --abbrev-ref HEAD'),
		date: async () => new Date(parseInt(await show('at')) * 1000),
	},
	...formats.map(
		([key, value]) => ({[key]: show.bind(null, value)})
	)
);

/**
 * @typedef     asyncGit
 * @description Get git info
 * @type     {Object}
 * @property {Promise<String>} name     Project name
 * @property {Promise<String>} branch   Current branch name
 * @property {Promise<String>} author   Author name of the last commit
 * @property {Promise<String>} comitter Comitter name of the last commit
 * @property {Promise<String>} email    Author email of the last commit
 * @property {Promise<String>} sha      Unique identifier of the last commit
 * @property {Promise<String>} short    7 Character Unique identifier of the last commit
 * @property {Promise<String>} subject  Most recent commit subject
 * @property {Promise<String>} message  Most recent commit full message
 * @property {Promise<String>} body     Most recent commit message body
 */
Object.defineProperties(
	module.exports,
	Object.entries(getters).reduce(
		(props, [key, value]) => {
			return Object.assign(
				props,
				{
					[key]: {
						get: value,
						configurable: true,
					},
				}
			)
		},
		{}
	)
);
