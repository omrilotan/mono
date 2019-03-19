# double-digit [![](https://img.shields.io/npm/v/double-digit.svg)](https://www.npmjs.com/package/double-digit) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/double-digit)

## 0️⃣ Add leading zero to positive numbers under 10

```js
const dd = require('double-digit');

dd(2) // '02'
dd(2.2) // '02.2'
dd(11) // '11'
dd('2') // '02'
dd('Something else') // 'Something else'
dd(Infinity) // Infinity
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const dd = require('double-digit/dist');
```
