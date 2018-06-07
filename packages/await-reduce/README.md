# await-reduce [![](https://img.shields.io/npm/v/await-reduce.svg)](https://www.npmjs.com/package/await-reduce) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/await-reduce)

Resolve and reduce an array of promises

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
    (accumulator, item) => [...accumulator, item],
    []
)
```

The callback matches Array.prototype.reduce's 4 argument signature, except the 4th argument (`array`) are the results of the Promises, and the callback itself can be asynchronous as well.
```js
const results = await reduce(
    [
        fetch('one'),
        fetch('two'),
        fetch('ten'),
    ],
    async (accumulator, response, index, array) => {
        if (!response.ok) {
            return accumulator
        }
        const data = await response.json()
        return Object.assign(accumulator, data)
    },
    {}
)
```
