const {join} = require('path');
const git = require('../async-git');
const exec = require('../async-execute');

describe('committee', () => {
	let sha;
	before(async() => {
		sha = await git.sha;
	});
	beforeEach(async() => {
		await exec(`touch ${join(__dirname, Math.random().toString(36).substr(2))}`);
		await exec('git add .');
	});
	after(async() => {
		await git.reset(sha);
	});
	it('Should commit as octocat by default', async() => {
		await exec(`bash ${join(__dirname, 'committee.sh')} --automate`);
		expect(await git.author).to.equal('octocat');
		expect(await git.sha).to.not.equal(sha);
	});
	it('Should commit as batman', async() => {
		await exec(`bash ${join(__dirname, 'committee.sh')} batman --automate`);
		expect(await git.author).to.equal('batman');
	});
	it('Should commit with a custom message', async() => {
		await exec(`bash ${join(__dirname, 'committee.sh')} batman I am the night --automate`);
		expect(await git.message).to.equal('I am the night');
	});
});
