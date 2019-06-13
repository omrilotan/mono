const {clean, override} = abuser(__filename);

const distribute = fake.returns('Distribute');
const split = fake.returns('Split');
const noop = () => null;
let arraySelect;

describe('array-select', () => {
	before(() => {
		override('./lib/distribute', distribute);
		override('./lib/split', split);
		arraySelect = require('.');
	});
	afterEach(() => {
		distribute.resetHistory();
		split.resetHistory();
	});
	after(() => clean('.'));

	it('Should call split with arguments, and return its return value', () => {
		const returnValue = arraySelect([1], noop);

		expect(split).to.have.been.calledWith([1], noop);
		expect(returnValue).to.equal('Split');
	});

	it('Should call distribute with arguments, and return its return value', () => {
		const returnValue = arraySelect([1], noop, noop);

		expect(distribute).to.have.been.calledWith([1], noop, noop);
		expect(returnValue).to.equal('Distribute');
	});
});
