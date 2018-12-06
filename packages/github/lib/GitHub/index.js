const {join} = require('path');
const Gofor = require('gofor/server');

/**
 * Github's API domain
 * @type {String}
 */
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * @typedef {GitHub}
 * @type {Function}
 * @description A GitHub instance will makes the API requests for you
 * @property {Function} request
 */
module.exports = class GitHub {
	constructor({token} = {}) {
		this.token = token;
		this.gofor = new Gofor({
			headers: {
				'Accept': 'application/json',
				'Authorization': `token ${this.token}`,
			},
		}).fetch;
		this.request = this.request.bind(this);
	}

	/**
	 * Perform an API request
	 * @param  {String} url          Relative URL of API method
	 * @param  {Object} [options={}] Custom headers, body, etc.
	 * @return {Promise}
	 */
	async request(url, options = {}) {
		const response = await this.gofor(
			join(GITHUB_API_BASE, url),
			options
		);

		if (response.ok) {
			return await response.json();
		}

		throw new Error(
			[
				`Error in request ${url}`,
				options.body ? `Body: ${options.body}` : '',
				JSON.stringify(await response.json(), null, 2),
			].join('\n')
		);
	}
}
