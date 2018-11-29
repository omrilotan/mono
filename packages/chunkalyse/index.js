const percent = require('@does/percent');
const jsoncopy = require('jsoncopy');
const {moduleName} = require('./lib');

/**
 * chunkalyse: summarise stats
 * @param  {Array} data.chunks
 * @return {Object}
 */
module.exports = ({chunks}) => jsoncopy(chunks)
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
									[moduleName(name)]: (accumulator[moduleName(name)] || 0) + size
								}
							),
							{}
						)
					)
					.reduce(
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
