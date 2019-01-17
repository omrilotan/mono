const { readFile } = require('fs');
const { promisify } = require('util');
const read = promisify(readFile);
const { resolve } = require('path');
const ansiEscapes = require('ansi-escapes');
const { name, version } = require('../../package.json');
const greeting = require('../greeting');

module.exports = async function greet() {
	const useImage = process.env.TERM_PROGRAM === 'iTerm.app' && parseInt(process.env.TERM_PROGRAM_VERSION) >= 3;
	const message = await greeting();

	if (!useImage) {
		console.log(
			`
         ${message.bold}
        ─────┬─${'─'.repeat(Math.max(message.length - 5, 1))}
    ╭──────╮ ╯
    │ ◜   ◝│
    │  ☉ ☉ │
    ├┬┬┬┬┬┬┤
    ├┴┴┴┴┴┴┤
    ╰─╮  ╭─╯
    ╭─╯  ╰─╮  ${`${name} ${version}`.underline.yellow}
    `
		);

		return;
	}

	console.log(`
              ${message.bold}
             ─────┬─${'─'.repeat(Math.max(message.length - 5, 1))}
                  ╯
   ${ansiEscapes.image(await read(resolve(__dirname, '../../a1vy.png')))}  ${`${name} ${version}`.underline.yellow}
    `
	);
}
