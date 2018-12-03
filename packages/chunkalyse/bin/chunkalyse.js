#!/usr/bin/env node

/**
 * @example
 * chunkalyse stats.json
 * cat stats.json | chunkalyse
 */

process.on('unhandledRejection', console.error);

const {resolve} = require('path');
const {argv} = require('yargs');
const chunkalyse = require('..');

/**
 * IIFE - run the application
 */
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

/**
 * Get the chunks and print them
 * @param  {Object} stats
 * no return value
 */
function start(stats) {
	const result = chunks(stats);
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

/**
 * Chunkalyse stats file. for multiple entries fallback to children
 * @param  {Object} stats
 * @return {Object}
 */
function chunks(stats) {
	try {
		if (stats.hasOwnProperty('chunks')) {
			return chunkalyse(stats);
		}

		return stats.children.reduce(
			(accumulator, child) => Object.assign(
				accumulator,
				chunkalyse(child)
			),
			{}
		);
	} catch (error) {
		console.log('I\'ve had trouble finding the chunks\n');

		throw error;
	}
}
