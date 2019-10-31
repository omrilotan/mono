module.exports = async () => {
	console.log('Checking for updates...');

	require('npm-check/lib/out/interactive-update')(
		await require('npm-check/lib')({update: true}),
	);
};
