# async-execute [![](https://img.shields.io/npm/v/async-execute.svg)](https://www.npmjs.com/package/async-execute) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/async-execute)

## 🦅 Execute command in a child process

```js
const execute = require('async-execute');

const commit_message = await execute('git log -1 --pretty=%B'); // Committed some changes
```

## Options

### Pipe stdout and stderr (default: false)
```js
await execute('npm t', {pipe: true});
```

### Exit process with child's exit code (default: false)
```js
await execute('npm t', {pipe: true, exit: true});
```
