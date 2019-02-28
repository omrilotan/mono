const flush = require('.');
let result;
const context = ({
	timer = 0,
	bulk = [],
	send = blob => { result = blob; },
}) => ({
	timer,
	bulk,
	send,
});

describe('57475/flush', () => {
	it('Should clear instance timeout', async() => {
		let called = false;
		const instace = context({
			timer: setTimeout(() => { called = true; }, 4),
		});
		flush.call(instace);
		await wait(8);
		expect(called).to.be.false;
	});
	it('Should send the bulk (separated by newlines)', async() => {
		const bulk = [1, 2, 3];
		const instace = context({bulk});
		flush.call(instace);
		expect(result).to.equal('1\n2\n3');
	});
	it('Should empty the bulk after flushing', async() => {
		const bulk = [1, 2, 3];
		const instace = context({bulk});
		flush.call(instace);
		expect(bulk).to.have.lengthOf(0);
	});
});
