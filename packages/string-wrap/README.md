# string-wrap [![](https://img.shields.io/npm/v/string-wrap.svg)](https://www.npmjs.com/package/string-wrap) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/string-wrap)

## 🥪 wrap a string from both sides

```js
const wrap = require('string-wrap');

// Both sides
wrap('someone else said it', '"') // "someone else said it"

// Before and after
wrap('some comment', '(', ')') // (some comment)
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const wrap = require('string-wrap/dist');
```
