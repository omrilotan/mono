const {name: [capital, ...rest], description} = require('../package.json');

process.stdout.write(`
${[capital.toUpperCase(), ...rest].join('')}

${description}

Usage:   chunkalyse <FILENAME> [OPTIONS]
Example: chunkalyse stats.json --format json

Options:
--help            Print this help
--format [human]  Format of the output (human, json)
`);
process.exit(0);
