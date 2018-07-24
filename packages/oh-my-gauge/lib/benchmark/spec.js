const Benchmark = require('./');

describe('oh-my-gauge/Benchmark', () => {
	describe('Reports back correctly', () => {
		it('Returns the default report string', () => {
			const benchmark = new Benchmark(
				(msg) => expect(msg).to.match(/method_name took (\d*)ms/)
			);
			benchmark(100, [() => {}, 'method_name'])
		});

		it('Returns a custom report string', () => {
			const benchmark = new Benchmark(
				(msg) => expect(msg).to.match(/method_name was (\d*) milliseconds long/),
				(ms, name) => `${name} was ${ms} milliseconds long`
			);
			benchmark(100, [() => {}, 'method_name'])
		});

		it('Runs the benchmark operations', function() {
			this.retries(3);

			const benchmark = new Benchmark(
				(ms) => {
					expect(ms).to.be.above(90);
					expect(ms).to.be.below(110);
				},
				(ms/*, name */) => ms
			);
			benchmark(100, [() => { freeze(1) }, 'method_name'])
		});
	});

});
