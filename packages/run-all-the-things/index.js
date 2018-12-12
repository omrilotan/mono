const { exec } = require('child_process');

module.exports = async scripts => await Promise.all(scripts.map(run));

const run = script => new Promise(resolve => {
	const task = exec(script);
	process.on('SIGINT', task.kill);
	task.stdout.pipe(process.stdout);
	task.stderr.pipe(process.stderr);
	task.on('close', resolve);
});
