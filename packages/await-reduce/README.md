# await-reduce [![](https://img.shields.io/npm/v/await-reduce.svg)](https://www.npmjs.com/package/await-reduce) [![](https://img.shields.io/badge/mono--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono)

Resolves and reduce an array of promises

```js
const reduce = require('await-reduce');
```

The behaviour matches Array.prototype.reduce.

```js
const results = await reduce(
    [
        fetch('one').then(res => res.json()),
        fetch('two').then(res => res.json()),
        fetch('ten').then(res => res.json()),
    ],
    (accumulator, item) => Object.assign(accumulator, {[item.key]: item.value}),
    {}
)
```

The callback matches the signature's 4 arguments
```js
const results = await reduce(
    [
        fetch('one').then(res => res.json()),
        fetch('two').then(res => res.json()),
        fetch('ten').then(res => res.json()),
    ],
    (accumulator, item, index, array) => index % 2 ? [...accumulator, item] : accumulator,
    []
)
```
