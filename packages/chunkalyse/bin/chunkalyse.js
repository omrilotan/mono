#!/usr/bin/env node

/**
 * @example
 * chunkalyse stats.json
 * cat stats.json | chunkalyse
 */

process.on('unhandledRejection', console.error);

const {resolve} = require('path');
const yargsParser = require('yargs-parser');
const chunkalyse = require('..');

/**
 * IIFE - run the application
 */
(() => {
	if (process.stdin.isTTY) {
		const {argv: [,, ...args]} = process;
		const argv = yargsParser(args) || {_: []};

		sendHelp(argv);
		start(getStats(argv), argv);
	} else {
		const chunks = [];
		process.stdin.on('data', chunk => chunks.push(chunk.toString()));
		process.stdin.on('end', () => start(JSON.parse(chunks.join(''))));
	}
})();

/**
 * Prints help to console if required.
 * @param  {Boolean}  options.h
 * @param  {Boolean}  options.help
 * @param  {String[]} options._[file] stats file
 * @return {Boolean}  Should the program continue
 */
function sendHelp({h, help, _: [file]} = {}) {
	if (h || help || !file) {
		require('./help');
	}
}

/**
 * Read stats json file
 * @param  {String[]} options._[file] stats file
 * @return {Object}
 */
function getStats({_: [file]} = {}) {
	const route = resolve(process.cwd(), file);

	try {
		return require(route);
	} catch (error) {
		console.error(`The file "${route}" could not be properly parsed.`);
		process.exit(1);
	}
}

/**
 * Get the chunks and print them
 * @param  {Object} stats
 * no return value
 */
function start(stats, {f, format = 'human'} = {}) {
	try {
		const result = chunkalyse(stats);
		let output;

		switch (f || format) {
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
