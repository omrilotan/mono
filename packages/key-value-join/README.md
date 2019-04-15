# key-value-join [![](https://img.shields.io/npm/v/key-value-join.svg)](https://www.npmjs.com/package/key-value-join) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/key-value-join)

## ⛓ Join object entries to create a string representation

```js
const join = require('key-value-join');

join({a: 1, b: 2}; // a:1,b:2

join({a: 1, b: 2}, '=', '&'); // a=1&b=2

join({a: 1, b: 2, c: undefined, d: false}, '=', '&', ([key, value]) => !!value); // a=1&b=2
```

### Arguments
| Argument | Type | Default | Purpose
| - | - | - | -
| 0 | Object | N/A | The object to convert
| 1 | String | `:` | Key-value delimiter
| 2 | String | `,` | List items delimiter
| 3 | Function | `()=>true` | Function to filter object entries †

> † Filter function receives one array containing `[key, value]`
> ```js
> const filter = ([key, value]) => Boolean(value)
> ```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const join = require('join/dist');
```
