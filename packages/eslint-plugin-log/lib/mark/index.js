const { red, green, yellow } = require('chalk');

/**
 * Set icon according to messages
 * @param  {Array} messages
 * @return {Array} [Function, String]
 */
module.exports = function mark(messages) {
	if (!messages.length) {
		return [green, '✔︎'];
	}

	if (messages.some(({severity}) => severity > 1)) {
		return [red, '✘'];
	}

	return [yellow, '▲'];
};
