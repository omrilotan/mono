const {join} = require('path');

/**
 * Github's API domain
 * @type {String}
 */
const GITHUB_API_BASE = 'api.github.com';

/**
 * Transfer protocol
 * @type {String}
 */
const PROTOCOL = 'https://';

/**
 * Adds the API base if it is not already included
 * @param  {String} url
 * @return {String}
 */
module.exports = url => url.toString().startsWith(PROTOCOL)
	?
	url
	:
	[PROTOCOL, join(GITHUB_API_BASE, url)].join('')
;
