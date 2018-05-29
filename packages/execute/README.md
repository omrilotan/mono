# Execute <a href="https://www.npmjs.com/package/@(._.)/execute"><img src="https://img.shields.io/npm/v/@(._.)/execute.svg"></a> [![](https://img.shields.io/badge/mono--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono)

Executes script in a child process

```js
const execute = require('@(._.)/execute');

const commit_message = await execute('git log -1 --pretty=%B'); // Committed some changes
```
