const bytes = require('byte-size');

/**
 * Convert stats summary object to a human readable list
 * @param  {Object} struct
 * @return {String}
 */
module.exports = struct => Object.entries(struct)
	.map(
		([name, {size, modules}]) => [
			`${name} (${bytes(size)})`,
			...Object.entries(modules)
				.sort(([, {size: a}], [, {size: b}]) => b - a)
				.map(
					([name, {size, percent}]) => ` • ${name}: ${bytes(size)} (${percent}%)`
				),
		].join('\n')
	).join('\n------\n');
