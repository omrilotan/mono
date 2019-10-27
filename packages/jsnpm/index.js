const npm = require('./npm');
const lib = require('./lib');

Object.assign(
	module.exports,
	Object.keys(lib).reduce(
		(accumulator, key) => Object.assign(
			accumulator,
			{
				[key]: async (...args) => await apply(key, args),
			},
		),
		{},
	),
);

async function apply(key, args) {
	const instance = await npm();

	return lib[key].apply(instance, args);
}
