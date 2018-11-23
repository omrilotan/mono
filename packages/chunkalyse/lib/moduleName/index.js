const {extname} = require('path');

const BUNDLED_FILES = [
	'',
	'js',
	'mjs',
	'jsx',
	'ts',
	'json',
];

/**
 * Get the module name from the module path
 * @param  {String} name
 * @return {String}
 */
module.exports = name => {
	if (name.startsWith('external')) {
		return 'external';
	}

	if (!isBundled(name)) {
		return null;
	}

	const parts = name.split('/');
	const _from = parts.findIndex(item => item === 'node_modules') + 1;

	if (_from === 0) {
		return 'self';
	}

	const _until = _from + (parts[_from].startsWith('@') ? 2 : 1);

	return parts
		.slice(_from, _until)
		.join('/');
};

const isBundled = name => BUNDLED_FILES.includes(extname(name).replace(/^\./, ''));
