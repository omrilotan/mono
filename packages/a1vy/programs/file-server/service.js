require('colors');

const dd = num => num > 9 ? num : `0${num}`;

module.exports = async ({host, port, base, page, delay = 0, cache} = {}) => {
	const {createServer} = require('http');
	const {parse} = require('url');
	const {join} = require('path');
	const {
		exists,
		readFile,
		statSync,
	} = require('fs');
	const {lookup} = require('mime-types');

	delay = Number(delay);
	delay = Number.isNaN(delay)
		? 0
		: delay
	;

	createServer((request, response) => {
		const uri = base + parse(request.url).pathname;
		let filename = join(process.cwd(), uri);

		function read(exists) {
			if(!exists) {
				handleError('Not Found', 404);
				return;
			}

			if (statSync(filename).isDirectory()) {
				filename += `/${page}`;
			}

			const date = new Date();
			const time = [
				date.getHours(),
				date.getMinutes(),
				date.getSeconds(),
			].map(dd).join(':');

			console.log(
				[
					`[${time}]`.yellow,
					' ',
					filename.replace(process.cwd(), '').bold,
					delay
						?  ` (~${delay}ms delay)`.dim
						: ''
					,
				].join(''),
			);

			readFile(filename, 'binary', respond);
		}

		function respond(error, file) {
			if (error) {
				handleError(error, 500);
				return;
			}

			setTimeout(() => {
				response.writeHead(200, {
					'Content-Type': lookup(filename),
					'Cache-Control': cache
						? 'private, max-age=240'
						: 'no-cache',
				});
				response.write(file, 'binary');
				response.end();
			}, delay);
		}

		function handleError(error, code) {
			response.writeHead(code, {'Content-Type': 'text/plain'});
			response.write(`${code}\n${error}\n`);
			response.end();
			return;
		}

		exists(filename, read);

	}).listen(parseInt(port, 10), host);

	console.log(`Static file server running:\nhttp://${host}:${port}\nCTRL + C to shutdown`);
};
