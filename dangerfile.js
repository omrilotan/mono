const {danger, fail, message, warn} = require('danger');

if (!danger.github.pr.body || danger.github.pr.body.length < 2) {
	fail('Pull requests need descriptions.');
}

if (danger.github.pr.base.ref === 'master') {
	warn('The base branch for this PR is something other than `master`. Are you sure you want to target something other than the `master` branch?');
}

message('Thank you for submitting a pull request');
