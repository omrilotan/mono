const errorStackParser = require('error-stack-parser')

const parse = errorStackParser.parse.bind(errorStackParser);

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

module.exports = error => {
	const parsedStack = parse(error);

	error.details = Object.assign(
		error.details || {},
		{parsedStack}
	);

	return Object.getOwnPropertyNames(error)
		.concat(FIELDS)
		.reduce(
			(accumulator, key) => error[key]
				?
				Object.assign(
					accumulator,
					{[key]: error[key]}
				)
				:
				accumulator,
			{...parsedStack[0]}
		);
};
