const {
	clearLine,
	clearScreenDown,
	cursorTo,
} = require('readline');

const { stdout } = process;

Object.assign(
	exports,
	{
		clear,
		end,
		update,
	},
);

/**
 * Update current STDOUT line
 * @param  {String} message
 * no return value
 */
function update(message) {
	clearLine(stdout, 0); // Clear current STDOUT line
	cursorTo(stdout, 0); // Place cursor at the start
	stdout.write(message.toString());
}

/**
 * Update current STDOUT line and move to next one
 * @param  {String} message
 * no return value
 */
function end(message = '') {
	update([message.toString(), '\n'].join(''));
}

/**
 * Clear current STDOUT stream
 * no return value
 */
function clear() {
	cursorTo(stdout, 0, 0);
	clearScreenDown(stdout);
}
