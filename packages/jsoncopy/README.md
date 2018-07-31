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
