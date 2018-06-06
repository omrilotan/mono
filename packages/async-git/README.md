# async-git [![](https://img.shields.io/npm/v/async-git.svg)](https://www.npmjs.com/package/async-git) [![](https://img.shields.io/badge/mono--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono)

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
| email | Author email of the last commit
| sha | Unique identifier of the last commit
| short | 7 Character Unique identifier of the last commit
| message | Most recent commit message
