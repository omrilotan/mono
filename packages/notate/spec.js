const notate = require('./');

describe('notate', () => {

	const dummy = {
		top: {
			middle: {
				low: 'value',
			},
		},
	};

	it('Should throw an error when non string is supposed to be processed',
		() => expect(notate.bind({}, null)).to.throw(TypeError)
	);

	it('Resolves to nested data structure',
		() => expect(
			notate(dummy, 'top.middle')
		).to.deep.equal(
			{low: 'value'}
		)
	);

	it('Resolves to an object',
		() => expect(
			notate(dummy, 'top.middle.low')
		).to.equal(
			'value'
		)
	);

	it('Resolves missing data to \'undefined\'',
		() => expect(
			notate(dummy, 'missing.data')
		).to.equal(
			undefined
		)
	);
});
