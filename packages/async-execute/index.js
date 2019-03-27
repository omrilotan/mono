const { exec } = require('child_process');

/**
 * Executes the script and resolves with the output message
 * @param  {String}  script
 * @return {Promise}
 */
module.exports = (script, {pipe = false, exit = false} = {}) => new Promise(
	(resolve, reject) => {
		const child = exec(
			script,
			(error, stdout = '') => {
				if (error) {
					error.exitCode = child.exitCode;
					error.code = child.exitCode;
					reject(error);
					return;
				}

				resolve(
					stdout.trim(),
					child.exitCode
				);
			}
		);

		pipe && child.stdout.on('data', (...args) => process.stdout.write(...args));
		pipe && child.stderr.on('data', (...args) => process.stderr.write(...args));
		exit && child.on('exit', (...args) => process.exit(...args));
	});
