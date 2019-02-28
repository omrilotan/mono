const {createSocket} = require('dgram');

/**
 * Create a UDP send function according to internet protocol
 * @param  {String} [options.protocol='ipv4'] Internet protocol version
 * @return {Function}
 */
module.exports = function createSender({host, port, protocol, errorHandler} = {}) {
	const sockettype = protocol === 'ipv6'
		? 'udp6'
		: 'udp4'
	;

	/**
	 * Sends a UDP message. Returns nothing
	 * @param  {String} data
	 * @return {undefined}
	 */
	return data => {
		const socket = createSocket(sockettype);
		const buffer = Buffer.from(data);

		socket.send(
			buffer,
			0,
			buffer.length,
			port,
			host,
			error => {
				socket.close();
				if (error && typeof errorHandler === 'function') {
					errorHandler(error);
				}
			}
		);
	};
};
