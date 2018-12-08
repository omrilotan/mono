const {URL} = require('url');

module.exports = function setParam(url, key, value) {
	if (typeof key === 'undefined') {
		return url;
	}
	url = new URL(url);
	url.searchParams.set(key, typeof value === 'undefined' ? url.searchParams.get(key) : value);
	return url.toString();
};
