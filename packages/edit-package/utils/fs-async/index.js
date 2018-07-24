const { promisify } = require('util');
const fs = require('fs');

module.exports = [
	'writeFile',
	'readFile',
].reduce(
	(exp, item) => Object.assign(exp, {[item]: promisify(fs[item])}),
	{}
);
