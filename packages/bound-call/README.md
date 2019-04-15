# bound-call [![](https://img.shields.io/npm/v/bound-call.svg)](https://www.npmjs.com/package/bound-call) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/bound-call)

## 👔 Create a bound call where you can pass "this" context as an argument

```js
const bound = require('bound-call');

const toLowerCase = bound('', 'toLowerCase');

['Hello', 'World'].map(toLowerCase); // ['hello', 'world']
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const bound = require('bound-call/dist');
```
