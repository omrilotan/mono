# jsoncopy [![](https://img.shields.io/npm/v/jsoncopy.svg)](https://www.npmjs.com/package/jsoncopy) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/jsoncopy)

Create a deep clone of an object using JSON functionalities. Very efficient and quick, not a comprehensive copyier (can't copy functions, circular references)

```js
const jsoncopy = require('jsoncopy');

const orig = {top: {nested: {value: 1}}};
const copy = jsoncopy(obj);
obj.top.nested.value = 2;

orig.top.nested.value // 2
copy.top.nested.value // 1
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const jsoncopy = require('jsoncopy/dist');
```
