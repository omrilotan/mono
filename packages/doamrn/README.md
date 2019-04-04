# doamrn [![](https://img.shields.io/npm/v/doamrn.svg)](https://www.npmjs.com/package/doamrn) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/doamrn) [![](https://badgen.net/bundlephobia/minzip/doamrn)](https://bundlephobia.com/result?p=doamrn)

Retrieve a random item from the arguments

```js
const random = require('doamrn');

random(1, 2, 3, 'string', new Object(), null) // any one of them
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const doamrn = require('doamrn/dist');
```
