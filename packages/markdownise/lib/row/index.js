const EMPTY = [
	undefined,
	null,
];

/**
 * Create a markdown table row
 * @param  {String[]} cells
 * @return {String}
 */
module.exports = cells => ['', ...cells].map(i => EMPTY.includes(i) ? '' : `${i} `).join('| ').trim();
