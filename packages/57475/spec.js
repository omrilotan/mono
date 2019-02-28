const dependencies = [
	'formatter',
	'udp',
	'push',
	'flush',
];
const stubs = {};
const originals = {};
const parameters = {};
const results = {};
const contexts = {};
const called = {};

function piggyback(dependency, fn) {
	stubs[dependency] = function(...args) {
		const result = originals[dependency].apply(this, args);
		results[dependency] = fn(...args);
		contexts[dependency] = this;
		parameters[dependency] = args;
		called[dependency] = true;
		return result;
	};
}

describe('57475', () => {
	let Stats;
	let {random} = Math;
	before(() => {
		delete require.cache[require.resolve('.')];
		dependencies.forEach(dependency => {
			const route = `./lib/${dependency}`;
			originals[dependency] = require(route);
			piggyback(dependency, () => null);
			require.cache[require.resolve(route)].exports = function(...args) {
				return stubs[dependency].apply(this, args);
			};
		});

		Stats = require('.');
	});
	beforeEach(() => {
		dependencies.forEach(dependency => {
			piggyback(dependency, () => null);
			delete results[dependency];
			delete contexts[dependency];
			delete parameters[dependency];
			delete called[dependency];
		});
	});
	afterEach(() => {
		Math.random = random;
	});
	after(() => {
		dependencies.forEach(dependency => {
			delete require.cache[require.resolve(`./lib/${dependency}`)];
		});
		delete require.cache[require.resolve('.')];
	});

	it('Should have a static getter containing all send types', () => {
		expect(Stats.TYPES).to.deep.equal({
			count: 'count',
			time: 'time',
			gauge: 'gauge',
			set: 'set',
			histogram: 'histogram',
		});
	});
	it('Should not accept changes to the static types object (freeze)', () => {
		const {TYPES} = Stats;
		TYPES.counter = 'count';
		expect(TYPES.counter).to.be.undefined;
	});
	it('Should have properties passed by constructor options', () => {
		const options = {
			MTU: 1234,
			TTL: 1050,
			timer: 0,
		};
		const client = new Stats(options);
		expect(client).to.include({
			MTU: 1234,
			TTL: 1050,
			timer: 0,
		});
	});
	it('Should have some (non prototype) functionality', () => {
		const client = new Stats();
		expect(client.bulk).to.deep.equal([]);
		expect(client.timer).to.equal(0);
		expect(client.send).to.be.a('function');
		expect(client.format).to.be.a('function');
		expect(client.flush).to.be.a('function');
	});
	it('Should have specific metrics functions to call on generic function', () => {
		const client = new Stats();
		const excepted = [];
		const sent = ['A', 2, {key: 'balue'}];
		client.generic = (...args) => excepted.push(...args);
		[
			'count',
			'time',
			'gauge',
			'set',
			'histogram',
		].forEach(type => {
			excepted.length = 0;
			client[type](...sent);
			expect(excepted).to.deep.equal([type, ...sent]);
		});
	});
	it('Should assign default tags to metrics', () => {
		const client = new Stats({tags: {environment: 'production'}});
		let _tags;
		client.format = (type, key, value, {tags} = {}) => {
			_tags = tags;
		};
		client.generic('count', 'a');
		expect(_tags).to.include({environment: 'production'});
	});
	it('Should override default tags', () => {
		const client = new Stats({tags: {environment: 'production'}});
		let _tags;
		client.format = (type, key, value, {tags} = {}) => {
			_tags = tags;
		};
		client.generic('count', 'a', 1, {tags: {environment: 'development'}});
		expect(_tags).to.include({environment: 'development'});
	});
	it('Should push sample rate is matched', () => {
		const client = new Stats();
		Math.random = () => .5;
		client.generic('count', 'a', 1, {rate: .4});
		expect(called.push).to.be.true;
	});
	it('Should skip when sample rate is not matched', () => {
		const client = new Stats();
		Math.random = () => .3;
		client.generic('count', 'a', 1, {rate: .4});
		expect(called.push).to.be.undefined;
	});
	it('Should call push in context', () => {
		const client = new Stats();
		client.generic('count', 'a');
		expect(contexts.push).to.equal(client);
	});
	it('Should follow functional pipeline', () => {
		const order = [];
		const client = new Stats();
		piggyback('push', () => order.push('push'));
		const format = client.format;
		client.format = function(...args) {
			order.push('format');
			return format.apply(this, args);
		};
		client.generic('count', 'a');
		expect(order).to.deep.equal(['format', 'push']);
	});
	it('Should push whatever is returned from format method', () => {
		const client = new Stats();
		client.format = () => 'some string';
		client.generic('count', 'a');
		expect(parameters.push).to.deep.equal(['some string']);
	});
});
