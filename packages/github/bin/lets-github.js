#!/usr/bin/env node

process.on('unhandledRejection', error => {
	console.error(error);
	process.exit(1);
});

console.log('TBC');
