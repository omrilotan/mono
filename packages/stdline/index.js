const {
	clearLine,
	cursorTo,
} = require('readline');
const { stdout } = process;

Object.assign(
	exports,
	{
		update,
		end,
	}
);

/**
 * Update current STDOUT line
 * @param  {String} message
 * no return value
 */
function update(message) {
	clear();
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
 * Clear current STDOUT line, places cursor at the start
 * no return value
 */
function clear() {
	clearLine(stdout, 0);
	cursorTo(stdout, 0);
}
