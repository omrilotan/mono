#!/usr/bin/env node

const { bin } = require('../package.json');
const runall = require('../');

process.on('unhandledRejection', error => {
	console.error(error);
	process.exit(1);
});

const args = [ ...process.argv ];

const names = [
	...Object.keys(bin),
	__filename.split('/').pop(),
];

while (args[0] && !names.some(string => args[0].endsWith(string))) {
	args.shift();
}

args.shift();

(async() => {
	const codes = await runall(args.map(arg => `npm run ${arg}`));

	process.exit(codes.reduce((a, b) => a + b));
})();
