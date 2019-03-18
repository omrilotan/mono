# module-scope [![](https://img.shields.io/npm/v/module-scope.svg)](https://www.npmjs.com/package/module-scope) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/module-scope)

## 📍 Get `__dirname` and `__filename` in native harmony modules

When running **native** harmony modules (`node --experimental-modules myapp`) the classic module scope signature is not available (`exports`, `require`, `module`, `__filename`, `__dirname`).
This module helps you get `__dirname` and `__filename` values easily from `import.meta.url`:

```js
import scope from 'module-scope';

const {__dirname, __filename} = scope(import.meta.url);
```
