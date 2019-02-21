const {name: [capital, ...rest], description} = require('../package.json');

console.log([capital.toUpperCase(), ...rest, ': ', description].join(''));

console.log(`
Generate stats:   webpack --profile --json > stats.json

Usage:            chunkalyse <FILENAME> [OPTIONS]
Example:          chunkalyse stats.json --format json

Options:
--help            Print this help
--format [human]  Format of the output (human, json)
`);
process.exit(0);
