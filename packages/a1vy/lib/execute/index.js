const exec = require('child_process').exec;

/**
 * Executes the script and resolves with the output message
 * @param  {String}    script Route to script file
 * @param  {String[]}  args   Rest of the arguments
 * @return {Promise}
 */
module.exports = (script, args = []) => new Promise(
	(resolve, reject) => {
		const child = exec(
			[script, ...args].join(' '),
			(error, stdout/*, stderr*/) => {
				if (error) {
					console.error(stdout);
					reject(`exec error: ${error}`);
					return;
				}

				resolve(
					stdout.trim(),
					child.exitCode,
				);
			},
		);
	});
