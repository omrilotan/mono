const random = require('./');

const NUMBERS = Array.from(Array(40)).map((_, i) => i);

describe('doamrn', () => {
	it('should retrieve a member from the array', () => {
		expect(NUMBERS).to.include(random(...NUMBERS));
	});

	it('should retrieve a random item each time', function() {
		this.retries(4);

		expect(random(...NUMBERS)).not.to.equal(random(NUMBERS));
	});
});
