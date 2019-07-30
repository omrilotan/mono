const { resolve } = require("path");
const exec = require("async-execute");
const exist = require("@does/exist");

/**
 * Create and push a git tag with the last commit message
 * @param  {String} path Path to file
 * no return value
 */
module.exports = async function(path) {
	if (!path || typeof path !== "string") {
		throw new TypeError(`string was expected, instead got ${path}`);
	}

	const absolute = resolve(path);

	if (!(await exist(absolute))) {
		throw new Error(`Could not find file at path "${absolute}"`);
	}

	const ts = await exec(`git log -1 --format="%at" -- ${path}`);

	return new Date(Number(ts) * 1000);
};
