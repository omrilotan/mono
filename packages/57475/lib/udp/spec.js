let udp;
const options = [];
const results = [];
const stub = {};

describe('57475/udp', () => {
	const {createSocket} = require('dgram');
	before(() => {
		require('dgram').createSocket = (...args) => stub.createSocket(...args);
		delete require.cache[require.resolve('.')];
		udp = require('.');
	});
	beforeEach(() => {
		options.length = 0;
		results.length = 0;
		stub.createSocket = (...args) => {
			options.push(...args);
			return {send: (...args) => results.push(...args)};
		};
	});
	after(() => {
		delete require.cache[require.resolve('.')];
		require('dgram').createSocket = createSocket;
	});
	it('Should create an IPv6 UDP when specified', () => {
		udp({protocol: 'ipv6'})('');
		expect(options).to.deep.equal(['udp6']);
	});
	it('Should send a request to correct host and port', () => {
		udp({host: '10.200.0.1', port: 2004})('');
		const [, , , port, host] = results;
		expect(host).to.equal('10.200.0.1');
		expect(port).to.equal(2004);
	});
	it('Creates an IPv4 UDP anything else is passed', () => {
		[
			'ipv4',
			undefined,
			'Shlomo',
		].forEach(protocol => {
			options.length = 0;
			udp({protocol})('');
			expect(options).to.deep.equal(['udp4']);
		});
	});
	it('Should send a buffer to socket', () => {
		udp()('hello');
		const [result] = results;
		expect(result).to.be.an.instanceof(Buffer);
		expect(result.toString()).to.equal('hello');
	});
});
