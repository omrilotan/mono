#!/usr/bin/env node

const dangerfile = require('.');

(async() => {
	try {
		const message = await dangerfile(__dirname);
		console.info(message);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
