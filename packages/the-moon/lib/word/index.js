/**
 * Convert kebab case to capitalised words
 * @param  {String} text kebab case word combinations
 * @return {String}      Words
 */
module.exports = text => text
	.split('-')
	.map(
		word => word.charAt(0).toUpperCase() + word.slice(1)
	)
	.join(' ');
