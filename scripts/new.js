#!/usr/bin/env node

/**
 * @example
 * npm run new @omrilotan/package-name
 */

process.on('unhandledRejection', error => { throw error; });
const {
	mkdir,
	readdir,
	writeFile,
} = require('fs').promises;
const {resolve} = require('path');

const {argv} = process;
argv.shift();
argv.shift();

const [name] = argv;

(async() => {
	const packages = await readdir(resolve(__dirname, '../', 'packages'));

	if (packages.includes(name)) {
		throw new Error(`Package "${name}" already exists`);
	}

	const base = resolve(__dirname, '../', 'packages', name);
	await mkdir(base);

	const files = {};

	files['package.json'] = JSON.stringify(
		{
			name,
			version: '0.0.0',
			description: '',
			keywords: [],
			author: 'omrilotan',
			license: 'MIT',
			repository: {
				type: 'git',
				url: 'git+https://github.com/omrilotan/mono.git',
			},
			homepage: `https://omrilotan.com/mono/${name}/`,
  		main: 'index.js',
		  scripts: {
		    test: `cd ../../; npm t ${name}; cd -`
		  }
		},
		['name', 'version', 'description', 'keywords', 'author', 'license', 'repository', 'type', 'url', 'homepage', 'main', 'scripts', 'test'],
		2
	);
	files['.npmrc'] = 'package-lock=false\naccess=public';
	files['.npmignore'] = '.*\n*.log\nspec.js';
	files['.gitattributes'] = '* text eol=lf';
	files['README.md'] = `# ${name} [![](https://img.shields.io/npm/v/${name}.svg)](https://www.npmjs.com/package/${name}) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/${name})`;
	files['index.js'] = 'module.exports = null';

	Promise.all(
		Object.entries(files).map(
			([name, content]) => writeFile(resolve(base, name), `${content}\n`)
		)
	);

})();
