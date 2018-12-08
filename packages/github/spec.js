const dummy = {};

function cleanup() {
	delete require.cache[require.resolve('node-fetch')];
	delete require.cache[require.resolve('gofor/server')];
	delete require.cache[require.resolve('.')];
}

describe('github (path)', () => {
	let request;
	beforeEach(cleanup);
	after(cleanup);

	before(() => {
		require.cache[require.resolve('gofor/server')] = {
			exports: class Gofor {
				constructor() {}
				fetch(...args) {
					const result = dummy.gofor(...args);
					return result ?
						{ok: true, json: async() => JSON.stringify(result)}
						:
						{ok: false, json: async() => null}
					;
				}
			},
		}

		const GitHub = require('.');
		request = new GitHub({token: 'FAKE_TOKEN'}).request;
	});
	afterEach(() => {
		dummy.gofor = () => {
			throw new Error('dummy.gofor was not defined');
		}
	});
	it('Should add the API base to request routes', async() => {
		let url;

		dummy.gofor = path => {
			url = path;
			return 'anything';
		}

		await request('some_function');
		expect(url).to.equal('https://api.github.com/some_function');

		await request('/other/function');
		expect(url).to.equal('https://api.github.com/other/function');
	});
});

describe('github (defaults)', () => {
	let request;
	beforeEach(cleanup);
	after(cleanup);

	before(() => {
		const fetch = (...args) => {
			const result = dummy.fetch(...args);
			return result ?
				{ok: true, json: async() => JSON.stringify(result)}
				:
				{ok: false, json: async() => null}
			;
		}
		Object.assign(fetch, require('node-fetch'));
		require.cache[require.resolve('node-fetch')].exports = fetch;

		const GitHub = require('.');
		request = new GitHub({token: 'FAKE_TOKEN'}).request;
	});
	afterEach(() => {
		dummy.fetch = () => {
			throw new Error('dummy.fetch was not defined');
		}
	});

	it('Should add authentication token to all requests', async() => {
		let headers;

		dummy.fetch = (path, options) => {
			headers = options.headers;
			return 'anything';
		}
		await request('');
		expect(headers.get('Authorization')).to.equal('token FAKE_TOKEN');
	});
});
