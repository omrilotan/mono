/**
 * Prefix numbers only
 * @param  {Number} number
 * @return {String|Any}
 */
module.exports = number => skip(number)
	? number
	: prefix(number)
;

/**
 * Prefix single digit numbers
 * @param  {Number} number
 * @return {String}
 */
const prefix = number => [
	number >=0 && number < 10 ? '0' : '',
	number,
].join('');

/**
 * Should not try to process
 * @param  {Any}     number
 * @return {Boolean}
 */
const skip = number => !numeric(number) && exception(number);

/**
 * Is an exception number
 * @param  {Any}     number
 * @return {Boolean}
 */
const exception = number => typeof number !== 'number'
	|| Number.isNaN(number)
	|| number === Infinity
	|| number === -Infinity
;

/**
 * Is a string representing a number
 * @param  {String|Any} string
 * @return {Boolean}
 */
const numeric = string => typeof string === 'string' && Number(string).toString() === string;
