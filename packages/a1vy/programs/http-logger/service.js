require('colors');
const express = require('express');
const {json} = require('body-parser');
const cookie = require('cookie-parser');
const cors = require('cors');

module.exports = async ({host, port, code} = {}) => {
	const app = express();
	code = code || 201;

	app.use(cors({preflightContinue: true}));
	app.use(json());
	app.use(cookie());
	app.use('*', (request, response) => {
		const {
			baseUrl,
			originalUrl,
			params,
			query,
			method,
			headers,
			body,
			cookies,
		} = request;

		const data = {
			baseUrl,
			originalUrl,
			params,
			query,
			method,
			headers,
			body,
			cookies,
		};

		console.log(
			`Message received on ${new Date()}\n`,
			Object.entries(data).map(
				([key, value]) => `> ${cap(key).bold}\n${printable(value)}`,
			).join('\n\n'),
			'\n======================================\n',
		);

		response.status(code).end();
	});


	app.listen(parseInt(port, 10), host, () => {
		console.log(`Static file server running:\nhttp://${host}:${port}\nCTRL + C to shutdown`);
	});
};

const cap = string => string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
const printable = data => data ? require('../../lib/pretty-json')(JSON.stringify(data)) : '';
