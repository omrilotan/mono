const inquirer = require('inquirer');
const execute = require(`${process.env.ROOT}/lib/execute`);

module.exports = async () => {
	const version = await execute(`${__dirname}/get-version.sh`);
	const message = await execute(`${__dirname}/get-message.sh`);

	inquirer
		.prompt([
			{
				name: 'version',
				message: 'Version',
				type: 'input',
				default: version,
			},
			{
				name: 'message',
				message: 'Message',
				type: 'input',
				default: message,
			},
		])
		.then(async answers => {
			const {version, message} = answers;

			return execute(`${__dirname}/service.sh`, [version, `"${message}"`])
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.error(error);
			throw error;
		});
};
