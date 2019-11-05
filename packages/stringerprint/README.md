# stringerprint [![](https://img.shields.io/npm/v/stringerprint.svg)](https://www.npmjs.com/package/stringerprint) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/stringerprint)

## 🧬 Create a unique, consistent, 32 char digest (AKA fingerprint) for a given string

```js
stringerprint('Troll') // 922a511f02d148e4c9390526d85ca519
```

**Use case**: Create a file fingerprint
```js
const { promises: { readFile, writeFile } } = require('fs');
const stringerprint = require('stringerprint');

const contents = (await readFile(filename)).toString();
const fingerprint = stringerprint(contents);
const path = filename.split('.');
path.splice(array.length - 1, 0, fingerprint);

await writeFile(path.join('.'), contents);

```
- In: `/path/to/file.js`
- Out: `/path/to/file.922a511f02d148e4c9390526d85ca519.js`
