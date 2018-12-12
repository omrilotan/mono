const percent = require('@does/percent');
const wait = require('@lets/wait');

const {
	cpus,
	freemem,
	totalmem,
} = require('os');

/**
* Get CPU and memory usage in percent (async). Takes about a second
* @return {Object} {cpu: Float, memory: Float}
*/
module.exports = async function usage(){
	const before = info();
	await wait(1000);
	const after = info();
	const {heapUsed, heapTotal} = process.memoryUsage();

	return {
		cpu: percent(after.idle - before.idle, after.total - before.total),
		memory: 100 - percent(freemem(), totalmem()),
		heap: percent(heapUsed, heapTotal),
	};
}

/**
* Get current idle and total CPU usage
* @return {Object} {idle: Integer, total: Integer}
*/
const info = () => cpus().reduce(
	(accumulator, {times: {user, nice, sys, irq, idle}}) => ({
		idle: accumulator.idle + idle,
		total: accumulator.total + user + nice + sys + irq + idle,
	}),
	{
		idle: 0,
		total: 0,
	}
);
