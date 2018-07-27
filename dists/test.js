const {resolve} = require('path');
const entries = require('./entries');

describe(
	'create dist files',
	() => Object.keys(entries)
		.forEach(
			pkg => it(
				`Should expose "${pkg
					.replace(resolve(__dirname, '../packages'), '')
					.split('/')
					.filter(i => !!i)
					.shift()}" dist as a consumable module`,
				() => {
					if (typeof require(pkg) !== 'function') {
						throw new TypeError(`${pkg} module should expose a function`);
					}
				}
			)
		)
);
