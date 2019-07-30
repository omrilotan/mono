#!/usr/bin/env node

process.on('unhandledRejection', error => { throw error; });

const {
	readdir,
	readFile,
	writeFile,
} = require('fs').promises;
const dateformat = require('dateformat');
const phrase = require('../packages/paraphrase/double');
const git = require('../packages/async-git');

const downloadcount = name => `fetch('https://api.npmjs.org/downloads/point/last-week/${name}').then(result=>result.json()).then(({downloads}) => {window['downloadcount${name}'].innerText = downloads || '0'}).catch(error => { /* ignore */ });`;

start();
async function start() {
	const [rows, links, scripts] = [[], [], []];

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
					bin,
				} = pkg;

				if (pkg.private || version.includes('alpha') || version.includes('beta')) {
					return;
				}

				const link = `./${item}/`;
				const icons = [];
				browser && icons.push('<i title="includes browser entry">🖥</i>');
				bin && icons.push('<i title="includes CLI program">🤖</i>');

				rows.push(`
<tr>
	<td><a href="${link}">${name}</a></td>
	<td>${description.replace(/`[^`]+`/g, '').replace(/\s{2,}/g, ' ').trim()}${icons.join(' ')}</td>
	<td><a href="https://www.npmjs.com/package/${name}"><small>${version}</small></a></td>
	<td id="downloadcount${name}"></td>
</tr>
`);
				links.push(`<link rel="prerender" href="${link}">`);
				scripts.push(downloadcount(name));

			}
		);

	const { name, description } = require('../package.json');
	const title = name.split('/').pop();
	const user = 'omrilotan';

	const content = rows.join('');
	const head = links.join('\n');
	const bottom = [
		'<script defer>',
		...scripts,
		'</script>',
	].join('\n');

	const template = (await readFile('src/homepage.html')).toString();
	const changed = `${await git.author}: "<a href="https://github.com/omrilotan/mono/commit/${await git.sha}"><b>${await git.message}</b></a>" <small>on ${dateformat(await git.date, 'dddd, mmmm dS, yyyy')}</small>`;

	const output = phrase(template, {
		head,
		bottom,
		title,
		user,
		content,
		description,
		changed,
	});

	await writeFile('docs/index.html', output);

	console.log('Written ./docs/index.html');
}
