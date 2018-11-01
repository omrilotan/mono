# assign <a href="https://www.npmjs.com/package/@(._.)/assign"><img src="https://img.shields.io/npm/v/@(._.)/assign.svg"></a> [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/assign)

Object **deep** assign

```js
const assign = require('@(._.)/assign');

assign({hash: {a: 1}}, {hash: {b: 2, c: 0}}, {hash: {c: 3}}) // {hash: {a: 1, b:2, c: 3}}
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const assign = require('@(._.)assign/dist');
```
