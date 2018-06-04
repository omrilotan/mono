# notate [![](https://img.shields.io/npm/v/notate.svg)](https://www.npmjs.com/package/notate) [![](https://img.shields.io/badge/mono--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono)

Resolve dot notation strings

```js
const notate = require('notate');

const obj = {
  top_level: {
    nested: {
      value: 'My Value',
    },
  },
};

notate('top_level.nested.value', obj) // 'My Value'

notate('top_level.missing.value', obj) // undefined
```
