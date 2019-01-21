#!/usr/bin/env node

/**
 * @example
 * chunkalyse stats.json
 * cat stats.json | chunkalyse
 */

process.on('unhandledRejection', console.error);

const {resolve} = require('path');
const [,, ...args] = process.argv;
const argv = require('yargs-parser')(args);
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
	try {
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
	} catch (error) {
		console.log('I\'ve had trouble finding the chunks\n');
		throw error;
	}
}
