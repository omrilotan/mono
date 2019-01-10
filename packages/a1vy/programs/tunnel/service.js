const ADDRESS_REGEXP = /^(([a-zA-Z\-.0-9]+):)?(\d+)$/;

module.exports = async ({from, to} = {}) => {
	const net = require('net');

	from = ADDRESS_REGEXP.exec(from);
	to = ADDRESS_REGEXP.exec(to);

	const [, , _host, _port] = from;
	const [, , host, port] = to;

	net.createServer(async from => {
		const to = net.createConnection({host, port});

		from.pipe(to);
		to.pipe(from);

	}).listen(_port, _host);

	console.log(`-= Tunnelling ${from} to ${to} =-\nCTRL + C to shutdown`);
};
