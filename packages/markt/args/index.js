const IGNORABLES = [
	'--'
];

module.exports = function args(...args) {
	const options = {};
	const rest = [];
	let found = !args.some(arg => arg.endsWith('markt'));

	while (args.length) {
		const arg = args.shift();

		if (!found || IGNORABLES.includes(arg)) {
			found = found || arg.endsWith('markt');

			continue;
		}

		if (arg.startsWith('--')) {
			const key = arg.replace(/^--/, '');

			if (args.length === 0 || args[0].startsWith('--')) {
				options[key] = true;
			} else {
				options[key] = args.shift();
			}
		} else {
			rest.push(arg);
		}
	}

	return {options, rest};
}
