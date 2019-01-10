module.exports = ({port = 8125, host = '127.0.0.1', encoding = 'utf8'} = {}) => {
	const dgram = require('dgram'); // Using https://nodejs.org/api/dgram.html
	const socket = dgram.createSocket('udp4');

	socket.on('listening', () => {
		const { address, port } = socket.address();

		console.log(`UDP Socket listening on ${address}:${port}\nCTRL + C to shutdown`);
	});

	socket.on('message', (message, remote) => {
		const { address, port } = remote;
		message = require('../../lib/pretty-json')(message.toString(encoding));

		console.log(`Message received from ${address}:${port} on ${new Date()}`);
		console.log(message);
		console.log('\n--------------------------------------\n\n');
	});

	socket.bind(port, host);
};
