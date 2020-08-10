const assignable = require('.');

describe('assign/assignable', () => {
	[
		() => {},
		{ a: 1 },
		[ 1, 2 ],
		new Object(),
		new Array(),
		/\w/g,
	].forEach(target => {
		it(`Should think that ${target.constructor.name} is assignable`, () => {
			expect(assignable(target)).to.be.true;
		});
	});
	[
		null,
		'Hello',
		7,
		undefined,
	].forEach(target => {
		it(`Should think that ${target ? target.constructor.name : target} is not assignable`, () => {
			expect(assignable(target)).to.be.false;
		});
	});
});
