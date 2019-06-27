const WHEREAMI = 'rev-parse --abbrev-ref HEAD';
const current_branch = `$(git ${WHEREAMI})`;
const what_the_commit = 'git commit -m "$(curl -s whatthecommit.com/index.txt)"';
const repository = '$(git remote get-url origin)';

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
		key: 'purge',
		desc: 'remove local and remote branches (accepts many)',
		value: '!f() { for var in "$@"; do git branch -D $var & git push origin :$var; done }; f',
	},
	{
		key: 'please',
		desc: 'git push <this_branch> --force-with-lease',
		value: `!f() { git push origin ${current_branch} --force-with-lease; }; f`,
	},
	{
		key: 'sum',
		desc: 'Generate a summary of pending changes',
		value: `!f() { git request-pull $\{1:-"master"} ${repository} ${current_branch}; }; f`,
	},
	{
		key: 'trash',
		desc: 'Move to master and delete current local branch',
		value: `!f() { local current_branch=${current_branch} && git checkout master && git branch -D $current_branch; };f`,
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
		key: 'yolo',
		desc: 'a commit with a random commit message from whatthecommit',
		value: `!f() { ${what_the_commit}; }; f`,
	},
	{
		key: 'wip',
		desc: 'add everything, commit with a random commit message and push to remote origin',
		value: `!f() { git add . && ${what_the_commit} && git push origin ${current_branch}; }; f`,
	},
	{
		key: 'fix',
		desc: 'add, ammend the current commit and push some fixes',
		value: `!f() { git add . && git commit --amend --no-edit && git push origin ${current_branch} --force-with-lease; }; f`,
	},
	{
		key: 'far',
		desc: 'fetch from remote master and rebase',
		value: '!f() { git checkout master && git pull origin master && git checkout - && git rebase master; }; f',
	},
];
