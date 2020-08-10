/**
 * Default Levels
 * @type {String[]}
 */
const DEFAULT_LEVELS = [
	'debug',
	'verbose',
	'info',
	'warn',
	'error',
	'critical',
];

/**
 * Generate object containing functions deemed operational by level
 * @param  {String[]} [options.levels=DEFAULT_LEVELS]
 * @param  {Any}      [options.minimal=options.levels[0]]
 * @param  {Function} [options.action=console.log]
 * @param  {Object}   [options.object={}]
 * @param  {Function} [options.noop=()=>undefined]
 * @return {Object}
 */
module.exports = function levelheaded({
	levels = DEFAULT_LEVELS,
	minimal = levels[0],
	action = console.log, // eslint-disable-line no-console
	object = {},
	noop = function noop() {},
} = {}) {
	const minimum = levels.indexOf(minimal);
	const enough = level => levels.indexOf(level) >= minimum;

	return levels.reduce(
		(instance, level) => Object.assign(
			instance,
			{ [level]: enough(level) ? (...args) => action.apply({ level }, args) : noop },
		),
		object,
	);
};
