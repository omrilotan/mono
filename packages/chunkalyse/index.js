const percent = require('@does/percent');
const jsoncopy = require('jsoncopy');
const {moduleName} = require('./lib');

/**
 * Chunkalyse stats file. for multiple entries fallback to children
 * @param  {Object} stats
 * @return {Object}
 */
module.exports = stats => {

	// Legacy: For single entry we use the more detailed 'modules' entry
	const entries = Object.keys(stats.entrypoints || {});
	if (entries.length === 1) {
		return analyseModules(entries[0], stats);
	}

	if (stats.hasOwnProperty('chunks')) {
		return analyseChunks(stats);
	}

	return stats.children.reduce(
		(accumulator, child) => Object.assign(
			accumulator,
			analyseChunks(child)
		),
		{}
	);
}

/**
 * summarise chunks
 * @param  {Array} data.chunks
 * @return {Object}
 */
const analyseChunks = ({chunks}) => jsoncopy(chunks)
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

/**
 * summarise modules
 * @param  {String} name
 * @param  {Array}  data.modules
 * @return {Object}
 */
const analyseModules = (name, {modules}, total = 0) => ({
	[name]: {
		modules: Object.entries(
			jsoncopy(modules).reduce(
				(accumulator, {name, size}) => (total = total + size) && Object.assign(
					accumulator,
					{
						[moduleName(name)]: (accumulator[moduleName(name)] || 0) + size,
					}
				),
				{}
			)
		).reduce(
			(accumulator, [name, size]) => typeof size === 'number' ? Object.assign(
				accumulator,
				{
					[name]: {
						size,
						percent: percent(size, total),
					},
				}
			) : accumulator,
			{}
		),
		size: total,
	},
});
