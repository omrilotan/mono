const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");

const TITLE = "## aliases";
const aliases = require("../aliases");
const sortby = require("../../sortby");

(async () => {
	const file = join(__dirname, "../README.md");
	const readme = (await readFile(file)).toString();
	const content = readme.split(TITLE).shift();

	await writeFile(
		file,
		[
			content.trim(),
			"",
			TITLE,
			"",
			"| alias | Description",
			"| - | -",
			...sortby(aliases, "key").map(({ key, desc }) => `| ${key} | ${desc}`),
			""
		].join("\n")
	);
})();
