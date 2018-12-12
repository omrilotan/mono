# wait [![](https://img.shields.io/npm/v/@lets/wait.svg)](https://www.npmjs.com/package/@lets/wait) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/wait)

## ⏲ A promising wait function

```js
const wait = require('@lets/wait');

...
await wait(200);
...
```

Or as a promise
```js
wait(200).then(...);
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const wait = require('@lets/wait/dist');
```
