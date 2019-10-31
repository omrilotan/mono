const wait = require('@lets/wait');
const { update } = require('stdline');

let i = 0;

module.exports = async({url, times_s, delay_s}) => {
	const times = Number(times_s);
	if (Number.isNaN(times)) {
		console.error(new Error(`Second argument is not a number (${times_s})`));
		process.exit(1);
	}
	const delay = Number(delay_s);
	if (Number.isNaN(delay)) {
		console.error(new Error(`Second argument is not a number (${delay_s})`));
		process.exit(1);
	}

	try {
		const concurrents = new Array(times)
			.fill(
				continuous.bind(
					null,
					visit.bind(null, url),
					delay,
				),
			);
		await Promise.all(concurrents.map(async c => await c()));
	} catch (error) {
		console.error(error);
	}
};

async function continuous(promise, delay) {
	while (true) { // eslint-disable-line no-constant-condition
		await promise();
		update(++i);
		await wait(delay);
	}
}

function visit(url) {
	let get;
	switch (url.split(':').shift()) {
		case 'http':
			get = require('http').get;
			break;
		case 'https':
			get = require('https').get;
			break;
		default:
			console.error(new Error(`Not set up to visit a non http(s) link (${url})`));
			process.exit(1);
	}

	return new Promise(
		(resolve, reject) => get(
			url,
			res => {
				res.on('data', () => null);
				res.on('end', resolve);
			},
		).on('error', reject),
	);
}
