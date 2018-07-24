/**
 * @module utils
 * @exports {Function} writeFile (async version)
 * @exports {Function} readFile (async version)
 * @exports {Function} jsonCopy
 */

Object.assign(
	module.exports,
	require('./fs-async'),
	require('./jsonCopy'),
	require('./packageData')
);
