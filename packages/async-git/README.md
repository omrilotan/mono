# async-git [![](https://img.shields.io/npm/v/async-git.svg)](https://www.npmjs.com/package/async-git) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/async-git)

## 👾 Retrieve data from current git repository

\* Properties are async (getters) [more on async properties](https://medium.com/@omrilotan/javascript-async-variables-686dc5f03cb2)

```js
const git = require('async-git');

`${await git.author} committed ${await git.message}` // Omri committed Some changes
```

### Properties

| Property | Type | Description | Example
| - | - | - | -
| name | String | Project name | `await git.name`
| branch | String | Current branch name | `await git.branch`
| author | String | Author name of the last commit | `await git.author`
| comitter | String | Comitter name of the last commit | `await git.comitter`
| email | String | Author email of the last commit | `await git.email`
| sha | String | Unique identifier of the last commit | `await git.sha`
| short | String | 7 Character Unique identifier of the last commit | `await git.short`
| message | String | Most recent commit full message (subject and body) | `await git.message`
| subject | String | Most recent commit subject | `await git.subject`
| body | String | Most recent commit message body | `await git.body`
| date | Date | Date of the last change | `await git.date`

### Functions

| Function | Parameters | Description | Example
| - | - | - | -
| tag | {String} version | Create a tag using the last commit message | `await git.tag('1.2.3')`
