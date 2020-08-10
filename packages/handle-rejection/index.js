const BUILT_IN = [
	'collect',
	'console',
	'exit',
	'throw',
];

const handle = fn => process.on('unhandledRejection', fn);

function bundle(...handlers) {
	handle(
		error => handlers.forEach(handler => {
			switch (typeof handler) {
				case 'function':
					handler(error);
					break;
				case 'string':
					if (BUILT_IN.includes(handler)) {
						require(`./handlers/${handler}`)(error);
					}
					break;
			}
		}),
	);
}

module.exports = BUILT_IN.reduce(
	(accumulator, key) => Object.assign(
		accumulator,
		{ [key]: () => handle(require(`./handlers/${key}`)) },
	),
	bundle,
);
