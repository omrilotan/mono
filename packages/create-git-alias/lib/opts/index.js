module.exports = opts => opts.reduce(
	(accumulator, opt) => opt.startsWith('-') ? accumulator.concat(opt.replace(/^-{1,}/, '')) : accumulator,
	[],
);
