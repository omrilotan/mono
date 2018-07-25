const safe = require('./');

describe('lib', () => {
	describe('safe', () => {
		it('handles errors', (done) => {
			const callback = safe(
				() => {},
				(error) => {
					expect(error).to.equal('ERROR_MESSAGE');
					done();
				}
			);

			callback('ERROR_MESSAGE');
		});

		it('omit error argument from the success callback', (done) => {
			const callback = safe(
				(arg) => {
					expect(arg).to.equal('Something good');
					done();
				},
				() => {
					assert(false);
					done();
				}
			);

			callback(null, 'Something good');
		});
	});
});
