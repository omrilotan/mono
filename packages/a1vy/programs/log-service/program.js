const {createServer} = require('http');

module.exports = ({host, port} = {}) => {
	createServer((request, response) => {
		const message = decodeURIComponent(request.url.replace(/^\//, ''));

		response.writeHead(200, {'content-type': 'text/plain'});
		response.write(message);
		response.end();

		if (/^favicon\.ico/.test(message)) {
			return;
		}

		process.stdout.write(message);
		process.stdout.write('\n');

	}).listen(parseInt(port, 10), host);

	console.log(`Static file server running:\nhttp://${host}:${port}\nCTRL + C to shutdown`);
};

