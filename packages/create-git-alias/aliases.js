const WHEREAMI = 'rev-parse --abbrev-ref HEAD';
const set_current_branch = `local current_branch=$(git ${WHEREAMI})`;

module.exports = [
	{
		key: 's',
		desc: 'Short status with branch name',
		value: 'status -bs',
	},
	{
		key: 'whereami',
		desc: 'What branch am I on?',
		value: WHEREAMI,
	},
	{
		key: 'aliases',
		desc: 'print all git aliases',
		value: '!git config -l | grep alias | cut -c 7-',
	},
	{
		key: 'open',
		desc: 'open this repo in the browser',
		value: '!f() { local repo_url=$(git config remote.origin.url); open ${repo_url%%.git}; }; f',
	},
	{
		key: 'purge',
		desc: 'remove local and remote branches (accepts many)',
		value: '!f() { for var in "$@"; do git branch -D $var & git push origin :$var; done }; f',
	},
	{
		key: 'please',
		desc: 'git push <this_branch> --force-with-lease',
		value: `!f() { ${set_current_branch}; git push origin $current_branch --force-with-lease; }; f`,
	},
	{
		key: 'trash',
		desc: 'Move to master and delete current local branch',
		value: `!f() { ${set_current_branch} && git checkout master && git branch -D $current_branch; };f`,
	},
	{
		key: 'merged',
		desc: 'After remote merge, trash current branch and pull from master',
		value: `!f() { local current_branch=$(git ${WHEREAMI}) && git checkout master && git branch -D $current_branch; git push origin :$current_branch; git pull origin master; };f`,
	},
	{
		key: 'l',
		desc: 'pretty log',
		value: 'log --pretty=format:"%C(yellow)%h %Cblue%>(12)%cr %Cgreen%<(20)%aN%Cred%d %Creset%s" --graph',
	},
	{
		key: 'pruner',
		desc: 'prune aggressive',
		value: 'git gc --prune=now --aggressive',
	},
	{
		key: 'feature',
		desc: 'Create a branch starting with today\'s date',
		value: '!f() { git checkout -b $(date +%Y-%m-%d)-$(echo $@ | tr " " "-"); }; f',
	},
	{
		key: 'get',
		desc: 'start a repo by remote URL',
		value: '!f() { git init; git remote add origin $1; git pull origin master; }; f',
	},
	{
		key: 'from',
		desc: 'how many commit since <commit id>',
		value: '!f() { git rev-list --count HEAD ^"$@"; }; f',
	},
	{
		key: 'wip',
		desc: 'a wip commit with a random commit message',
		value: '!f() { git commit -m "$(curl -s whatthecommit.com/index.txt)"; }; f',
	},
	{
		key: 'yolo',
		desc: 'a commit with a random commit message from whatthecommit',
		value: '!f() { git commit -m "$(curl -s whatthecommit.com/index.txt)"; }; f',
	},
	{
		key: 'fix',
		desc: 'add, ammend the current commit and push some fixes',
		value: `!f() { git add . && git commit --amend --no-edit && git please && ${set_current_branch} && git push origin $current_branch --force-with-lease; }; f`,
	},
];
