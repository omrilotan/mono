#!/usr/bin/env node

if (parseInt(process.versions.node) < 10) {
	console.log('A1vy supported in node versions 10 and beyond');
	process.exit(1);
}

require('./app')();
