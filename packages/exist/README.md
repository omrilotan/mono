# @does/exist [![](https://img.shields.io/npm/v/@does/exist.svg)](https://www.npmjs.com/package/@does/exist) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/exist)

## Check if a file exists and is writeable

```js
const exist = require('@does/exist');

const fileExists = await exist(join(__dirname, 'index.js'));
```

### Options

#### quiet: `false` (default is `true`)
Will log error messages when trying to access a file that's not there
```js
await exist(path, {quiet: false});
```
