let results = [];

describe('57475 - integration', () => {
	let Client, client;
	before(() => {
		delete require.cache[require.resolve('..')];
		require('../lib/udp');
		require.cache[require.resolve('../lib/udp')].exports = () => (...args) => results.push(...args);
		Client = require('..');
		client = new Client();
	});
	beforeEach(() => {
		results.length = 0;
	});
	after(() => {
		delete require.cache[require.resolve('../lib/udp')];
		delete require.cache[require.resolve('..')];
	});
	[
		'count',
		'time',
		'gauge',
		'set',
		'histogram',
	].forEach(
		method => it(
			`Should expose method "${method}"`,
			() => expect(client[method]).to.be.a('function')
		)
	);
	it('Should sanitise key', () => {
		const client = new Client({MTU: 0});
		client.count('Hello1-there$.');
		expect(results[0]).to.contain('hello1_there_.');
	});
	it('Should only fire when the bulk gets full', () => {
		const client = new Client({MTU: 100});
		client.count(new Array(46).join('a'));
		expect(results).to.have.lengthOf(0);
		client.count(new Array(46).join('a'));
		expect(results).to.have.lengthOf(0);
		client.count(new Array(2).join('a'));
		expect(results).to.have.lengthOf(1);
	});
	it('Should allow for no MTU by setting it to 0 (or anything lower that 5)', () => {
		const client = new Client({MTU: 0});
		expect(results).to.have.lengthOf(0);
		client.count(new Array(2).join('a'));
		expect(results).to.have.lengthOf(1);
	});
	it('Should fire after ttl has expired', async() => {
		const client = new Client({TTL: 50});
		client.count(new Array(10).join('a'));
		expect(results, 'Expected not to fire immediately').to.have.lengthOf(0);
		await wait(21);
		expect(results, 'Expected not to fire before TTL has expired').to.have.lengthOf(0);
		await wait(32);
		expect(results, 'Expected to fire once TTL has expired').to.have.lengthOf(1);
	});
	it('Should maintain ttl after adding to bulk', async() => {
		const client = new Client({TTL: 50});
		client.count(new Array(10).join('a'));
		expect(results, 'Expected not to fire immediately').to.have.lengthOf(0);
		await wait(21);
		client.count(new Array(10).join('a'));
		expect(results, 'Expected not to fire before TTL has expired').to.have.lengthOf(0);
		await wait(30);
		expect(results, 'Expected to fire once TTL has expired').to.have.lengthOf(1);
	});
	it('Should flush immaterially explicitly', async() => {
		const client = new Client({TTL: 50});
		client.count('a');
		client.flush();
		expect(results, 'Expected to fire immaterially').to.have.lengthOf(1);
	});
});
