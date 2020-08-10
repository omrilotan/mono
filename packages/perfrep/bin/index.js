#!/usr/bin/env node

process.on('unhandledRejection', console.error);

const perfrep = require('../');

(async() => {
	const perf = await perfrep();
	console.log(
		Object.entries(perf).map(
			([ key, value ]) => `• ${key}: ${value}%`,
		).concat('').join('\n'),
	);
})();
