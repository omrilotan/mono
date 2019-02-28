const push = require('.');
let called = false;

/**
 * Create a context object (apply defaults)
 * @param  {Array}    [options.bulk]
 * @param  {Number}   [options.timer]
 * @param  {Function} [options.flush]
 * @param  {Number}   [options.MTU]
 * @param  {Number}   [options.TTL]
 * @return {Object}
 */
const context = ({
	bulk = [],
	timer = 0,
	flush = function() {
		called = true;
		this.bulk.length = 0;
	},
	MTU = 576,
	TTL = 1000,
}) => {
	const instance = {
		bulk,
		timer,
		flush,
		MTU,
		TTL,
	};
	instance.flush = instance.flush.bind(instance);
	Object.defineProperty(
		instance, 'size', {
			get: function() {
				return this.bulk.join('\n').length;
			},
		}
	);
	return instance;
};

describe('57475/push', () => {
	beforeEach(() => {
		called = false;
	});
	it('Should not flush immediately when metric is smaller than MTU', () => {
		push.call(context({MTU: 10}), '123456789');
		expect(called).to.be.false;
	});
	it('Should flush immediately when metric is larger than MTU', () => {
		push.call(context({MTU: 10}), '1234567890a');
		expect(called).to.be.true;
	});
	it('Should flush when bulk size matches MTU', () => {
		const that = context({MTU: 10});
		expect(that.bulk).to.have.lengthOf(0);
		push.call(that, '12345');
		expect(called).to.be.false;
		expect(that.bulk).to.have.lengthOf(1);
		push.call(that, '1234');
		expect(called).to.be.true;
		expect(that.bulk).to.have.lengthOf(0);
	});
	it('Should flush when bulk size "will pass" MTU', () => {
		const that = context({MTU: 10});
		expect(that.bulk).to.have.lengthOf(0);
		push.call(that, '1234');
		expect(called).to.be.false;
		expect(that.bulk).to.have.lengthOf(1);
		push.call(that, '1234');
		expect(called).to.be.false;
		expect(that.bulk).to.have.lengthOf(2);
		push.call(that, '1234');
		expect(called).to.be.true;
		expect(that.bulk).to.have.lengthOf(1);
	});
	it('Should send metrics after TTL has ended', async() => {
		const that = context({TTL: 10});
		expect(that.bulk).to.have.lengthOf(0);
		push.call(that, '1234');
		expect(called).to.be.false;
		expect(that.bulk).to.have.lengthOf(1);
		await wait(5);
		push.call(that, '1234');
		expect(called).to.be.false;
		expect(that.bulk).to.have.lengthOf(2);
		await wait(6);
		expect(called).to.be.true;
		expect(that.bulk).to.have.lengthOf(0);
		called = false;
		push.call(that, '1234');
		expect(called).to.be.false;
		expect(that.bulk).to.have.lengthOf(1);
	});
});
