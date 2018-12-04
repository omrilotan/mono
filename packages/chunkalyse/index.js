const percent = require('@does/percent');
const jsoncopy = require('jsoncopy');
const {moduleName} = require('./lib');

/**
 * Chunkalyse stats file. for multiple entries fallback to children
 * @param  {Object} stats
 * @return {Object}
 */
module.exports = stats => {
	if (stats.hasOwnProperty('chunks')) {
		return analyse(stats);
	}

	return stats.children.reduce(
		(accumulator, child) => Object.assign(
			accumulator,
			analyse(child)
		),
		{}
	);
}

/**
 * analyse: summarise chunks
 * @param  {Array} data.chunks
 * @return {Object}
 */
const analyse = ({chunks}) => jsoncopy(chunks)
	.reduce(
		(accumulator, {names, size, modules}) => Object.assign(
			accumulator,
			{
				[names.shift()]: {
					size,
					modules: Object.entries(
						modules.reduce(
							(accumulator, {name, size}) => Object.assign(
								accumulator,
								{
									[moduleName(name)]: (accumulator[moduleName(name)] || 0) + size,
								}
							),
							{}
						)
					).reduce(
						(accumulator, [name, _size]) => Object.assign(
							accumulator,
							{
								[name]: {
									size: _size,
									percent: percent(_size, size),
								},
							}
						),
						{}
					),
				},
			}
		),
		{}
	);
