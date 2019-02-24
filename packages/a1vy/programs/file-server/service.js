module.exports = async ({host, port, base, page} = {}) => {
	const http = require('http');
	const url  = require('url');
	const path = require('path');
	const fs   = require('fs');

	const mime = require('mime-types');

	http.createServer((request, response) => {
		const uri = base + url.parse(request.url).pathname;
		let filename = path.join(process.cwd(), uri);

		function read(exists) {
			if(!exists) {
				handleError('Not Found', 404);
				return;
			}

			if (fs.statSync(filename).isDirectory()) {
				filename += `/${page}`;
			}

			fs.readFile(filename, 'binary', respond);
		}

		function respond(error, file) {
			if (error) {
				handleError(error, 500);
				return;
			}

			response.writeHead(200, {'content-type': mime.lookup(filename)});
			response.write(file, 'binary');
			response.end();
		}

		function handleError(error, code) {
			response.writeHead(code, {'Content-Type': 'text/plain'});
			response.write(`${code}\n${error}\n`);
			response.end();
			return;
		}

		fs.exists(filename, read);

	}).listen(parseInt(port, 10), host);

	console.log(`Static file server running:\nhttp://${host}:${port}\nCTRL + C to shutdown`);
};
