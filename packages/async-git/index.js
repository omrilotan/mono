const exec = require('async-execute');

const formats = {
	author: 'an',
	comitter: 'cn',
	email: 'ae',
	sha: 'H',
	short: 'h',
	subject: 's',
	message: 'B',
};

const getters = Object.assign(
	{
		name: async () => await exec('basename -s .git `git config --get remote.origin.url`'),
		branch: async () => await exec('git rev-parse --abbrev-ref HEAD'),
	},
	Object.entries(formats).reduce(
		(props, [key, value]) => Object.assign(
			props,
			{
				[key]: async () => await exec(`git show -s --format=%${value}`),
			}
		),
		{}
	)
);

/**
 * @typedef     gitGet
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
 */
module.exports = Object.defineProperties(
	{},
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
