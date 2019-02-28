const {createServer} = require('net');

module.exports = ({port = 2003, host = '127.0.0.1'} = {}, encoding = 'utf8') => {
	const server = createServer(socket => {
		socket.on('data', message => {
			message = require('../../lib/pretty-json')(message.toString(encoding));

			console.log(`Message received from ${socket.remoteAddress}:${socket.remotePort} on ${new Date()}`);
			console.log(message);
			console.log('\n--------------------------------------\n\n');
		});
	});

	server.listen(port, host);
	console.log(`TCP Socket listening on ${host}:${port}\nCTRL + C to shutdown`);
};
