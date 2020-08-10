Object.defineProperties(
	module.exports,
	{
		Gauge: { get: () => require('./lib/gauge') },
		Benchmark: { get: () => require('./lib/benchmark') },
	},
);
