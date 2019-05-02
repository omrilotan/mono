const ordinal = require('ordinal');

let current = 0;

/**
 * Count
 * @return {String}
 */
const count = () => ordinal(++current);

/**
 * Set
 * @param  {Number} number
 * @return {count}
 */
count.set = number => {
	current = number;
	return count;
};

/**
 * From
 * @param  {Number} number
 * @return {String}
 */
count.from = number => count.set(number)();

/**
 * Reset to 0
 * @return {count}
 */
count.reset = () => count.set(0);

/**
 * Count down
 * @return {String}
 */
count.down = () => ordinal(--current);

module.exports = count;
