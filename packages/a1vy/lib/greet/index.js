const { readFile } = require('fs').promises;
const { resolve } = require('path');
const ansiEscapes = require('ansi-escapes');
const random = require('doamrn');
const { name, version } = require('../../package.json');

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
    `,
		);

		return;
	}

	console.log(`
              ${message.bold}
             ─────┬─${'─'.repeat(Math.max(message.length - 5, 1))}
                  ╯
   ${ansiEscapes.image(await readFile(resolve(__dirname, '../../a1vy.png')))}  ${`${name} ${version}`.underline.yellow}
    `,
	);
};

async function greeting () {
	const file = await readFile(resolve(__dirname, 'greetings.txt'));
	const greetings = file.toString().split('\n').filter(item => !!item && !item.startsWith('#'));

	return random(...greetings);
}
