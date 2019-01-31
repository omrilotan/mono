const errors = [];

module.exports = error => errors.push(error);

process.on('beforeExit', () => {
	if (!errors.length) {
		return;
	}

	const {log, error} = console;

	log('╭───────────────╮');
	log('│ Error Summary │');
	log('╰───────────────╯');

	errors.forEach((e, i) => {
		log(`\n❗️ Error ${i + 1}:`);
		error(e);
	});
});
