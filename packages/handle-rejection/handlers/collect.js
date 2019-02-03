const errors = [];

module.exports = error => errors.push(error);

process.on('beforeExit', () => {
	if (!errors.length) {
		return;
	}

	const {log, error} = console;

	log('╭─────────────────────────────╮');
	log('│ Unhandled Rejection Summary │');
	log('╰─────────────────────────────╯');

	errors.forEach((e, i) => {
		log(`\n❗️ Rejection ${i + 1}:`);
		error(e);
	});
});
