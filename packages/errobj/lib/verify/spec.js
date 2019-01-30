const verify = require('.');

describe('errobj/verify', () => {
	[
		undefined,
		null,
		() => null,
		'string',
		100,
		[],
		{},
		/\w/g,
		new Set(),
	].forEach(value => it(
		`Should throw error for ${value ? value.constructor.name : value}`,
		() => expect(() => verify(value)).to.throw(RangeError)
	));
	[
		new Error(),
		new RangeError(),
		new ReferenceError(),
		new SyntaxError(),
		new TypeError(),
		(() => {
			class SomeCustomError extends Error {
				constructor(...args) {
					super(...args);
				}
			}

			return new SomeCustomError();
		})(),
	].forEach(value => it(
		`Should accept ${value ? value.constructor.name : value}`,
		() => expect(() => verify(value)).to.not.throw()
	));
});
