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
	name = name.split(' ')[0]; // avoid comments like "./src/lib/index.js + 4 modules"

	if (name.startsWith('external')) {
		return 'external';
	}

	const ext = extname(name).replace(/^\./, '');

	if (!BUNDLED_FILES.includes(ext)) {
		return `${ext} files`;
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
