# assign <a href="https://www.npmjs.com/package/@recursive/assign"><img src="https://img.shields.io/npm/v/@recursive/assign.svg"></a> [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/assign)

Object **recursive** assign

```js
const assign = require('@recursive/assign');

assign({hash: {a: 1}}, {hash: {b: 2, c: 0}}, {hash: {c: 3}}) // {hash: {a: 1, b:2, c: 3}}
```

I will merge:
 - ✔ objects
 - ✔ arrays
 - ✔ functions

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const assign = require('@recursive/assign/dist');
```
