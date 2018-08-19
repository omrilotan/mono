# async-git [![](https://img.shields.io/npm/v/async-git.svg)](https://www.npmjs.com/package/async-git) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/async-git)

Retrieves data from current git repository

```js
const git = require('async-git');

const [
	author_name,
	commit_message,
] = [
	await git.author,
	await git.message,
];

`${author_name} committed ${commit_message}` // Omri committed Some changes
```

| Property | Type | Description
| - | - | -
| name | String | Project name
| branch | String | Current branch name
| author | String | Author name of the last commit
| comitter | String | Comitter name of the last commit
| email | String | Author email of the last commit
| sha | String | Unique identifier of the last commit
| short | String | 7 Character Unique identifier of the last commit
| subject | String | Most recent commit subject
| message | String | Most recent commit full message
| date | Date | Date of the last change
