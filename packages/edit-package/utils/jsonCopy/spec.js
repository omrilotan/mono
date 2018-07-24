const { jsonCopy } = require('.');

describe('edit-package/utils/jsonCopy', () => {
	it('creates a deep copy', () => {
		const obj = {a: {b: 3}};
		const copy = jsonCopy(obj);

		obj.a.b = 4;

		expect(copy.a.b).to.equal(3);
	});

	it('can only create JSONable items', () =>
		expect(
			() => jsonCopy({win: global})
		).to.throw(SyntaxError)
	);
});
