#!/usr/bin/env node

const {argv: [,,ip,...domains]} = process;
const reverseDNSLookup = require('.');

(async() => {
	try {
		await reverseDNSLookup.source(ip, ...domains);
		console.log(`${ip} checks up with ${domains.join(', ')}`);
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
