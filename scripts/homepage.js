#!/usr/bin/env node

const fs = require('fs').promises;
const phrase = require('../packages/paraphrase/double');

(async () => {
	const [rows, links] = [[], []];

	(await fs.readdir('packages'))
		.forEach(
			item => {
				if (item.startsWith('.')) { return }

				const {
					name,
					description,
					version,
				} = require(`../packages/${item}/package.json`);

				if (version.includes('alpha') || version.includes('beta')) {
					return;
				}

				const link = `./${item}/`;

				rows.push(`
<tr>
	<td><a href="${link}">${name}</a></td>
	<td>${description}</td>
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

	const template = (await fs.readFile('src/homepage.html')).toString();

	const output = phrase(template, {
		head,
		title,
		user,
		content,
		description,
	});

	await fs.writeFile('docs/index.html', output);
})();
