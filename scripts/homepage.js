#!/usr/bin/env node

process.on('unhandledRejection', error => { throw error; });

const {
	readdir,
	readFile,
	writeFile,
} = require('fs').promises;
const phrase = require('../packages/paraphrase/double');

(async () => {
	const [rows, links] = [[], []];

	(await readdir('packages'))
		.forEach(
			item => {
				if (item.startsWith('.')) { return; }

				const pkg = require(`../packages/${item}/package.json`);
				const {
					name,
					description,
					version,
					browser,
				} = pkg;

				if (pkg.private || version.includes('alpha') || version.includes('beta')) {
					return;
				}

				const link = `./${item}/`;

				rows.push(`
<tr>
	<td><a href="${link}">${name}</a></td>
	<td>${description}${browser ? ' <i title="includes browser entry">🖥</i>' : ''}</td>
	<td><a href="https://www.npmjs.com/package/${name}"><small>${version}</small></a></td>
</tr>
`);
				links.push(`<link rel="prerender" href="${link}">`);

			}
		)

	const { name, description } = require('../package.json');
	const title = name.split('/').pop();
	const user = 'omrilotan';

	const content = rows.join('');
	const head = links.join('\n');

	const template = (await readFile('src/homepage.html')).toString();

	const output = phrase(template, {
		head,
		title,
		user,
		content,
		description,
	});

	await writeFile('docs/index.html', output);
})();
