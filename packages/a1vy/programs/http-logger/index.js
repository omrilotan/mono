const { prompt } = require('inquirer');
const ip = require('../../lib/ip');

const [LOWEST_STATUS, HIGHEST_STATUS] = [100, 599];

module.exports = async function() {
	const answers = await prompt(
		[
			{
				name: 'host',
				message: 'On which host should the server run?',
				type: 'input',
				default: ip(),
			},
			{
				name: 'port',
				message: 'On which port should the server run?',
				type: 'input',
				default: '1337',
			},
			{
				name: 'code',
				message: 'What status code should it return?',
				type: 'input',
				default: '201',
				validate: value => value === '' || validCode(value)
					? true
					: `Please choose a number between ${LOWEST_STATUS} and ${HIGHEST_STATUS}`,
			},
		],
	);

	return await require('./service')(answers);
};

function validCode(value) {
	const code = Number(value);

	if (Number.isNaN(code)) {
		return false;
	}

	if (code < LOWEST_STATUS) {
		return false;
	}

	if (code > HIGHEST_STATUS) {
		return false;
	}

	return true;
}
