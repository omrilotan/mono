const args = require('.');

describe('markt/args', () => {
	it('options must begin with --', () =>
		expect(
			args(
				'hello',
				'there',
				'markt',
				'markt',
				'sir'
			).options
		).to.be.empty
	);

	it('argumetns without -- are "rest"', () =>
		expect(
			args(
				'hello',
				'there',
				'markt',
				'markt',
				'sir'
			).rest
		).to.deep.equal(['markt', 'sir'])
	);

	it('strips everything until first "markt"', () =>
		expect(
			Object.keys(
				args(
					'--hello',
					'--there',
					'--markt',
					'--markt',
					'--sir'
				).options
			)
		).to.deep.equal(['markt', 'sir'])
	);

	it('includes all if there is no "markt"', () =>
		expect(
			Object.keys(
				args(
					'--hello',
					'--there',
					'--sir'
				).options
			)
		).to.deep.equal(['hello', 'there', 'sir'])
	);

	it('skips double minus', () =>
		expect(
			Object.keys(
				args(
					'--hello',
					'--',
					'--sir'
				).options
			)
		).to.deep.equal(['hello', 'sir'])
	);

	it('collects args', () =>
		expect(
			args(
				'npx',
				'markt',
				'--destination',
				'docs/index.html',
				'--use-default'
			).options
		).to.deep.equal({
			destination: 'docs/index.html',
			'use-default': true,
		})
	);

});
