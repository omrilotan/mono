const exec = require('async-execute');
const git = require('.');

describe(`async-git (${Object.getOwnPropertyNames(git).join(', ')})`, async() => {
	let start;

	before(async() => {
		if (process.env.CI) { return; }

		start = await git.sha;
		await exec('git add .')
		await exec('git commit -m "committing all changes before tests"')
	});

	after(async() => {
		if (process.env.CI) { return; }

		await exec(`git reset ${start} --soft`)
	});

	[
		'name',
		'branch',
		'author',
		'comitter',
		'email',
		'sha',
		'short',
		'subject',
		'message',
	].forEach(member => it(`${member} should retreive a string`, async () => {
		const value = await git[member];
		expect(value).to.be.a('string');
		expect(value).to.have.lengthOf.at.least(1);
	}));

	it('Should get the short and long sha', async() => {
		expect(await git.sha).to.have.lengthOf(40);
		expect(await git.short).to.have.lengthOf(7);
	});

	it('Should be able to import specific getters', async () => {
		const { author } = git;
		expect(await author).to.be.a('string');
	});

	it('Should get the name of the repo', async () =>
		expect(await git.name).to.equal('mono')
	);
});
