/**
 * Random pass/fail per rate [0-1]
 * @param  {Number} rate Decimal fraction
 * @return {Boolean}
 */
module.exports = rate => Math.random() < rate;
