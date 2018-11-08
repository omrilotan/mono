const { isSet, isMap } = require('./');

describe('assign/isSet', () => {

	it('not a set', () => {
		const notSet = [];
		expect(isSet(notSet)).to.equal(false);
	});

	it('instance of set', () => {
		const set = new Set();
		expect(isSet(set)).to.equal(true);
	});

	it('set with polyfill', () => {
		function Set() {}
		Set.prototype.toString = () => '[object Set]';
		const set = new Set();

		expect(isSet(set)).to.equal(true);
	})

});

describe('assign/isMap', () => {

	it('not a map', () => {
		const notSet = [];
		expect(isMap(notSet)).to.equal(false);
	});

	it('instance of map', () => {
		const map = new Map();
		expect(isMap(map)).to.equal(true);
	});

	it('map with polyfill', () => {
		function Map() {}
		Map.prototype.toString = () => '[object Map]';
		const map = new Map();

		expect(isMap(map)).to.equal(true);
	})

});
