const FIELDS = [
	'message',
	'stack',

	// inherited (not own property)
	'name',

	// optional
	'code',
	'details',

	// non standard browser fields
	'fileName',
	'lineNumber',
	'columnNumber',
];

/**
 * Get property names of an error, including default (not own)
 * @param  {Error} error
 * @return {String[]}
 */
module.exports = error => Array.from(
	new Set(
		Object
			.getOwnPropertyNames(error)
			.concat(FIELDS),
	),
);
