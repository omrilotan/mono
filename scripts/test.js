#!/usr/bin/env node

const {resolve} = require('path');
const find = require('find');

process.on('unhandledRejection', console.error);

const list = (base, pattern) => new Promise(resolve => find.file(pattern, base, resolve));

const Mocha = require('mocha');

(async() => {
	const files = (await list(resolve(__dirname, '../', 'packages'), /spec.js/)).filter(i => !i.includes('node_modules'));
	console.log(`Running ${files.length} specs`);

	const MochaJUnitReporter = require('mocha-junit-reporter');

	class reporter extends MochaJUnitReporter {
		constructor(...args) {
			super(...args);

			this._runner.on('pass', ({title, file}) => console.log(`✔ ${title}\n- ${file}\n`));
			this._runner.on('fail', ({title, file}) => console.log(`✘ ${title}\n- ${file}\n`));
		}
	}

	require('../spec.js');

	await Promise.all(
		files.map(file => (async() => {
			const mocha = new Mocha({
				fullStackTrace: true,
				timeout: 60000,
				useColors: true,
				reporter,
				reporterOptions: {mochaFile: './junit/test-results.xml'},
			});

			mocha.files = [file];
			mocha.run();
		})())
	);
})();
