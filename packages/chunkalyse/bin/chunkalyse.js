#!/usr/bin/env node

/**
 * @example
 * chunkalyse stats.json
 */

process.on('unhandledRejection', console.error);

const {resolve} = require('path');
const bytes = require('byte-size');
const chunkalyse = require('..');



(() => {
	if (process.stdin.isTTY) {
		const {argv} = process;

		argv.shift();
		argv.shift();

		const [file] = argv;

		const stats = require(
			resolve(
				process.cwd(),
				file
			)
		);
		start(stats);

	} else {
		const chunks = [];
		process.stdin.on('data', chunk => chunks.push(chunk.toString()));
		process.stdin.on('end', () => start(JSON.parse(chunks.join(''))));
	}
})();

function start(stats) {
	console.log(
		chunkalyse(stats).map(
			({id, size, modules}) => [
				`${id} (${bytes(size)})`,
				...Object.entries(modules)
					.sort(([,a], [,b]) => b.percent - a.percent)
					.map(
						([name, {size, percent}]) => ` • ${name}: ${bytes(size)} (${percent}%)`
					),
			].join('\n')
		).join('\n------\n')
	);
}
