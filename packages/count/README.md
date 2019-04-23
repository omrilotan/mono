# count [![](https://img.shields.io/npm/v/@lets/count.svg)](https://www.npmjs.com/package/@lets/count) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/count)

## 🔢 Consistent counter

```js
// Just count
count() // 1st
count() // 2nd

// Set counter
count.set(14)
count() // 15th
count() // 16th

// Start counting from
count.from(10)
count() // 11th
count() // 12th

// Count down
count.down() // 11th
count.down() // 10th

// Reset counter to 0
count.reset()
count.down() // -1st
count.down() // -2nd
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const count = require('@lets/count/dist');
```
