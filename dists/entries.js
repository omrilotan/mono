const {resolve} = require('path');
const {readdirSync} = require('fs');
const packageDir = (...args) => resolve(
	__dirname,
	'../packages',
	...args
);

module.exports = readdirSync(packageDir())
	.reduce(
		(accumulator, pkg) => {
			try {
				const {
					browser,
					main,
					scripts,
				} = require(
					packageDir(pkg, 'package.json')
				);

				if (scripts.dist) {
					throw new Error('I\'ll create my own dist files, thank you very much.');
				}

				const entry = browser && main
					? {[packageDir(pkg, browser)]: packageDir(pkg, main)}
					: {}
				;
				return Object.assign(accumulator, entry);
			} catch (error) {
				return accumulator;
			}
		},
		{}
	);
