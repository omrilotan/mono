const Gofor = require('gofor');
const {
	base,
	setParam,
} = require('./lib');

/**
 * @typedef {GitHub}
 * @type {Function}
 * @description A GitHub instance will makes the API requests for you
 * @property {Function} request
 */
module.exports = class GitHub {
	constructor({ token } = {}) {
		this.token = token;
		this.gofor = new Gofor({
			headers: {
				'Accept': 'application/json',
				'Authorization': `token ${this.token}`,
			},
		}).fetch;
		this.request = this.request.bind(this);
		this.paged = this.paged.bind(this);
	}

	/**
	 * Perform an API request
	 * @param  {String} url          Relative URL of API method
	 * @param  {Object} [options={}] Custom headers, body, etc.
	 * @return {Promise}
	 */
	async request(url, options = {}) {
		const response = await this.gofor(
			base(url),
			options,
		);

		if (response.ok) {
			return await response.json();
		}

		throw new Error(
			[
				`Error in request ${url}`,
				options.body ? `Body: ${options.body}` : '',
				JSON.stringify(await response.json(), null, 2),
			].join('\n'),
		);
	}

	/**
	 * Collect paginated results
	 * @param  {String} url
	 * @param  {Object} options         Request options
	 * @return {Any}
	 */
	async paged(url, options = {}, { results = [], page = 1 } = {}) {
		const result = await this.request(
			setParam(
				base(url),
				'page',
				page,
			),
			options,
		);
		results.push(...result);

		if (result.length === 30) {
			return await this.paged(url, options, { results, page: page + 1 });
		}

		return results;
	}
};

