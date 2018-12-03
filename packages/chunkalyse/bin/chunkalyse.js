#!/usr/bin/env node

/**
 * @example
 * chunkalyse stats.json
 */

process.on('unhandledRejection', console.error);

const {resolve} = require('path');
const {argv} = require('yargs');
const chunkalyse = require('..');

(() => {
	if (process.stdin.isTTY) {
		const [file] = argv._;
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
	const result = chunkalyse(stats);
	const {format = 'human'} = argv;
	let output;

	switch (format) {
		case 'json':
			output = JSON.stringify(result, null, 2);
			break;
		case 'human':
		default:
			output = require('../lib/humanise')(result);
	}

	console.log(output);
}
