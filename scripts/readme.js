#!/usr/bin/env node

process.on('unhandledRejection', error => { throw error; });

const fs = require('fs').promises;
const reduce = require('../packages/await-reduce');

(async() => {

	const results = await reduce(
		await fs.readdir('./packages'),
		async (results, dir) => {
			try {
				const pkg = require(`../packages/${dir}/package.json`);
				const {
					name,
					description,
					version,
				} = pkg;

				if (pkg.private || version.includes('alpha') || version.includes('beta')) {
					return results;
				}

				return [
					...results,
					[
						dir,
						name,
						description,
						version,
					],
				];
			} catch (error) {
				return results;
			}
		},
		[]
	);

	await fs.writeFile('./README.md', output(results));


})();

function output(packages) {
	const { description, name } = require('../package.json');
	const title = name.split('/').pop();
	const badge = 'https://circleci.com/gh/omrilotan/mono.svg?style=svg';
	const ciurl = 'https://circleci.com/gh/omrilotan/workflows/mono';
	const insightsIcon = 'https://img.shields.io/badge/-%F0%9F%93%8A-fff.svg';
	const insights = 'https://circleci.com/build-insights/gh/omrilotan/mono/master';

	return `# ${title} [![](${badge})](${ciurl}) [![](${insightsIcon})](${insights})
${description}

## TOC

| Name | Description | Link
| --- | --- | ---
${packages.map(
		([dir, pkg, description, version]) => `| **\`${pkg}\`** | [${description.replace(/`[^`]+`/g, '').replace(/\s{2,}/g, ' ').trim()}](./packages/${dir}#readme) | [![${version}](https://img.shields.io/npm/v/${pkg}.svg)](https://www.npmjs.com/package/${pkg})`
	).join('\n')}
`;
}
