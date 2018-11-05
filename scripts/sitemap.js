#!/usr/bin/env node

process.on('unhandledRejection', error => { throw error; });

const args = process.argv.reduce(
	(accumulator, arg, index, argv) => {
		if (arg.startsWith('--')) {
			accumulator[arg.replace('--', '')] = argv[index + 1];
		}

		return accumulator;
	},
	{}
);

const {readdir} = require('fs').promises;
const {resolve} = require('path');

// Use:
// node scripts/sitemap.js --base "https://omrilotan.com"
(async () => {
	const d = new Date();
	const dd = num => num > 9 ? num : `0${num}`;
	const date = [
		d.getFullYear(),
		d.getMonth() + 1,
		d.getDate(),
	].map(dd).join('-');

	const packages = (await readdir(resolve(__dirname, '../packages'))).filter(item => !item.startsWith('.'));
	const {base} = args;
	const urls = packages.map(item => `
	<url>
		<loc>${ base }/mono/${ item }/</loc>
		<lastmod>${ date }</lastmod>
		<priority>0.60</priority>
	</url>`).join('\n');

	const map = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	<url>
		<loc>${ base }/</loc>
		<lastmod>${ date }</lastmod>
		<priority>1.00</priority>
	</url>
	<url>
		<loc>${ base }/mono/</loc>
		<lastmod>${ date }</lastmod>
		<priority>0.80</priority>
	</url>
	${urls}
</urlset>`;

	console.log(map); // eslint-disable-line no-console
})();
