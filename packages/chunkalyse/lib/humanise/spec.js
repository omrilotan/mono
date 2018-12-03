const humanise = require('.');

const data = {
	'awesome-module': {
		size: 1000,
		modules: {
			'module-1': { size: 447, percent: 45 },
			'module-2': { size: 200, percent: 20 },
			'module-3': { size: 100, percent: 10 },
			'module-4': { size: 453, percent: 45 },
		},
	},
};

const humanised = `
awesome-module (1.0 kB)
 • module-4: 453 B (45%)
 • module-1: 447 B (45%)
 • module-2: 200 B (20%)
 • module-3: 100 B (10%)
`;

describe('chunkalyse/humanise', () => {
	it('Should convert a summary object to a readable list sorted by size', () => {
		expect(humanise(data).trim()).to.equal(humanised.trim());
	});
});

