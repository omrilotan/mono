const { danger, fail, warn, message } = require('danger');

const {github: {pr: {body, base}}} = danger;
let errors = 0;

if (!body || body.length < 2) {
	fail('Pull requests need descriptions.');
	++errors;
}

if (base.ref !== 'master') {
	warn(`The base branch for this PR is \`${base.ref}\`. Are you sure you want to target something other than the \`master\` branch?`);
	++errors;
}

if (errors) {
	message('Please address all errors and warnings before merging this pull request');
}
