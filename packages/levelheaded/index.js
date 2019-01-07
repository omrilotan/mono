const DEFAULT_LEVELS = [
	'debug',
	'verbose',
	'info',
	'warn',
	'error',
	'critical',
];

const noop = function() {};

module.exports = function levelheaded({
	levels = DEFAULT_LEVELS,
	minimal = levels[0],
	action = console.log, // eslint-disable-line no-console
} = {}) {
	const minimum = levels.indexOf(minimal);
	const enough = level => levels.indexOf(level) >= minimum;

	return levels.reduce(
		(instance, level) => Object.assign(
			instance,
			{[level]: enough(level) ? (...args) => action.apply({level}, args) : noop}
		),
		{}
	);
};
