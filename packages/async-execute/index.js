const exec = require('child_process').exec;

/**
 * Executes the script and resolves with the output message
 * @param  {String}  script
 * @return {Promise}
 */
module.exports = script => new Promise(
	(resolve, reject) => {
		const child = exec(
			script,
			(error, stdout = '') => {
				if (error) {
					error.exitCode = child.exitCode;
					reject(error);
					return;
				}

				resolve(
					stdout.trim(),
					child.exitCode
				);
			}
		);
	});
