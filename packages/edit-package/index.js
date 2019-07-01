/**
 * @module packageEditor
 * @exports {Function} read
 * @exports {Function} write
 * @exports {Function} reset
 *
 */

const {
	writeFile,
	readFile,
	jsonCopy,
	packageData,
} = require('./utils');

const assign = require('@recursive/assign');

let _original;
let _suffix;
const original = async () => _original = _original || jsonCopy(await packageData());
const suffix = async () => {
	if (typeof _suffix !== 'string') {
		const contents = await readFile('package.json');

		_suffix = contents.toString().endsWith('\n') ? '\n' : '';
	}
	return _suffix;
};



/**
 * Read package
 * @return {Object}
 *
 * @example
 * await packageEditor.read()
 */
module.exports.read = async () => await packageData();

/**
 * Edit the package file
 * @param  {Object} data
 * @return {Object}
 *
 * @example
 * await packageEditor.write({name: 'NOT_THE_PACKAGE_NAME'});
 */
module.exports.write = async data => {
	await original(); // make sure original is stored

	const json = assign(
		{},
		await module.exports.read(),
		data
	);

	try {
		await writeFile(
			'package.json',
			JSON.stringify(json, null, 2) + await suffix()
		);
	} catch (error) {
		throw error;
	}

	return json;
};

/**
 * Reset to the original package.json
 * @return {Objecy}
 */
module.exports.reset = async () => {
	try {
		await writeFile(
			'package.json',
			JSON.stringify(await original(), null, 2) + await suffix()
		);
	} catch (error) {
		throw error;
	}
};
