# async-git [![](https://img.shields.io/npm/v/async-git.svg)](https://www.npmjs.com/package/async-git) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/async-git)

## 👾 Retrieve data from current git repository

> Properties are async (getters)

```js
const git = require('async-git');

`${await git.author} committed ${await git.message}` // Omri committed Some changes
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
| message | String | Most recent commit full message (subject and body)
| subject | String | Most recent commit subject
| body | String | Most recent commit message body
| date | Date | Date of the last change
