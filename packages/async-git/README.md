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

| Property | Description
| - | -
| name | Project name
| branch | Current branch name
| author | Author name of the last commit
| comitter | Comitter name of the last commit
| email | Author email of the last commit
| sha | Unique identifier of the last commit
| short | 7 Character Unique identifier of the last commit
| subject | Most recent commit subject
| message | Most recent commit full message
