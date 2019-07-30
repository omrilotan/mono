#!/usr/bin/env node

const {
	clearScreenDown,
	cursorTo,
} = require('readline');

const {
	stdout,
	versions,
	exit,
} = process;
const {
	log,
	warn,
} = console;

cursorTo(stdout, 0, 0);
clearScreenDown(stdout);

const {satisfies} = require('semver');
const {name, engines: {node: MINIMUM_VERSION}} = require('./package.json');

const {node: CURRENT_VERIOSN} = versions;

if (!satisfies(CURRENT_VERIOSN, MINIMUM_VERSION)) {
	warn([
		`${name} is supported in nodejs versions ${MINIMUM_VERSION} and beyond.`,
		`You are running version ${CURRENT_VERIOSN}. Please upgrade nodejs.`,
	].join('\n'));
	exit(1);
}

log('\n          Hold, please');

require('./app')();
