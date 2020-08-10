const benchpress = require('.');

describe('bench-press', () => {
	it('Has default message', () =>
		assert(
			benchpress(() => {}).includes('Running 1000 times took'),
		),
	);

	it('Accepts different messages', () =>
		assert.equal(
			benchpress(() => {}, { message: 'something else' }),
			'something else',
		),
	);

	it('Accepts a different number of iterations', () =>
		assert.equal(
			benchpress(() => {}, { iterations: 10, message: '${iterations}' }),
			'10',
		),
	);

	it('bench pressing runs the functions', () =>
		assert(
			benchpress(() => {
				sleep(10);
			}, { iterations: 10, message: '${duration}' }) > 99,
		),
	);
});
