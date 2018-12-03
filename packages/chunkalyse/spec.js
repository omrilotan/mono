const chunkalyse = require('.');
const fixtures = new Map();

fixtures.set(
	'emoji-picker-react',
	{
	  "main": {
	    "size": 331215,
	    "modules": {
	      "self": {
	        "size": 243771,
	        "percent": 74
	      },
	      "core-js": {
	        "size": 38776,
	        "percent": 12
	      },
	      "prop-types": {
	        "size": 26510,
	        "percent": 8
	      },
	      "style-loader": {
	        "size": 12465,
	        "percent": 4
	      },
	      "babel-runtime": {
	        "size": 5241,
	        "percent": 2
	      },
	      "css-loader": {
	        "size": 2260,
	        "percent": 1
	      },
	      "object-assign": {
	        "size": 2108,
	        "percent": 1
	      },
	      "external": {
	        "size": 84,
	        "percent": 0
	      }
	    }
	  }
	}
);

describe('chunkalyse fixtures', () => {
	it('Should not mutate the original object', () => {
		const stats = require(`./fixtures/emoji-picker-react.json`)

		const before = JSON.stringify(stats);
		chunkalyse(stats);
		const after = JSON.stringify(stats);

		expect(before).to.equal(after);
	});

	fixtures.forEach(
		(value, key) => {
			it(`Should match fixture stats with expected result for "${key}"`, () => {
				expect(chunkalyse(require(`./fixtures/${key}.json`))).to.deep.equal(value);
			});
		}
	);

	[
		'butter-toast',
		'emoji-picker-react',
		'react-dates',
	].forEach(lib => {
		it(`Should calculate all the parts of the application to reach its sum (${lib})`, () => {
			const chunks = chunkalyse(require(`./fixtures/${lib}.json`));
			const summary = Object.values(chunks)[0];
			const sum = Object.values(summary.modules).map(v => v.size).reduce(
				(sum, i) => sum + i,
				0
			);
			expect(sum).to.equal(summary.size);

		});
	});
});

