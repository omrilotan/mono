const {resolve} = require('path');
const entries = require('./entries');

describe(
	'bundle files',
	() => Object.keys(entries)
		.forEach(
			pkg => it(
				`Should expose "${pkg
					.replace(resolve(__dirname, '../packages'), '')
					.split('/')
					.filter(i => !!i)
					.shift()}" bundle as a consumable module`,
				() => {
					if (typeof require(pkg) !== 'function') {
						throw new TypeError(`${pkg} module should expose a function`);
					}
				}
			)
		)
);
