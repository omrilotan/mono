const show = require('./lib/show');
const name = require('./lib/name');
const branch = require('./lib/branch');
const date = require('./lib/date');
const tag = require('./lib/tag');
const reset = require('./lib/reset');

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

const getters = Object.assign(
	{
		name,
		branch,
		date,
	},
	...formats.map(
		([key, value]) => ({[key]: show.bind(null, value)})
	)
);

const functions = {
	tag,
	reset,
};

/**
 * @typedef     asyncGit
 * @description Get git info
 * @type     {Object}
 * @property {Promise<String>} name     Project name
 * @property {Promise<String>} branch   Current branch name
 * @property {Promise<String>} date     Get last author date
 * @property {Promise<String>} author   Author name of the last commit
 * @property {Promise<String>} comitter Comitter name of the last commit
 * @property {Promise<String>} email    Author email of the last commit
 * @property {Promise<String>} sha      Unique identifier of the last commit
 * @property {Promise<String>} short    7 Character Unique identifier of the last commit
 * @property {Promise<String>} subject  Most recent commit subject
 * @property {Promise<String>} message  Most recent commit full message
 * @property {Promise<String>} body     Most recent commit message body
 * @property {Function}        tag      Create and push a git tag with the last commit message
 * @property {Function}        reset    Reset current HEAD to the specified state
 */
Object.defineProperties(
	module.exports,
	Object.assign(
		Object.entries(getters).reduce(
			(props, [key, value]) => Object.assign(
				props,
				{
					[key]: {
						get: value,
						configurable: true,
					},
				}
			),
			{}
		),
		Object.entries(functions).reduce(
			(props, [key, value]) => Object.assign(
				props,
				{
					[key]: {
						value,
						configurable: true,
					},
				}
			),
			{}
		)
	)
);
