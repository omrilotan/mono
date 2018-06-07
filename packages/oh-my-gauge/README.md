# Oh My Gauge! [![](https://img.shields.io/npm/v/oh-my-gauge.svg)](https://www.npmjs.com/package/oh-my-gauge) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/oh-my-gauge)

time Javascript operations

```js
const { Gauge, Benchmark } = require('oh-my-gauge');
```
## Gauge
1. Create a gauge instance with the results reporting function.
2. Wrap a function with the gauge. It will return a function that measures the operation, reports it, and returns the given functions' return value.

A gauge takes in a function
```js
const Gauge = require('oh-my-gauge').Gauge;
const gauge = new Gauge((res, name) => console.log(`${name} took ${res}ms`));
//                        ^     ^         ^
//              Milliseconds  String   report-method

const myObj = {
    name: 'My Obj',
    sayName: function() {
        return this.name;
    }
};

myObj.sayName = gauge(myObj.sayName, 'sayName method');
```

## Benchmark
Benchmark compares between multiple operations. It also scrambles the order so running it multiple times can yield more reliable results.
```js
const { Benchmark } = require('oh-my-gauge');

const benchmark = new Benchmark(); // console.log with default format
-- OR --
const benchmark = new Benchmark(
    sendMetricsToServer, // override the default console.log callback
    (ms, name) => `Method: ${name}, Time: ${ms}` // override default formatter
);

benchmark(
  100000,
  [() => {/* Do thing one   */}, 'Thing 1 description'],
  [() => {/* Do thing two   */}, 'Thing 2 description'],
  [() => {/* Do thing three */}, 'Thing 3 description']
);

// Use a map, maps are fun
const things = new Map();
things.set(() => {/* Do thing one   */}, 'Thing 1 description');
things.set(() => {/* Do thing two   */}, 'Thing 2 description');
things.set(() => {/* Do thing three */}, 'Thing 3 description');

benchmark(1e5, ...things);
```

### This is a classic optimisation example

```js
const { Benchmark } = require('oh-my-gauge')

const benchmark = new Benchmark()

const numbers = (size, from = 0) => Array.from(Array(size)).map((i, n) => n + from)

const tests = new Map()

const option1 = () => (numbers(100, 1))
  .map((i) => i * 3)
  .filter((i) => i % 2)
  .reduce((i, a) => i + a, 100)
tests.set(option1, 'Option 1: A neat one liner')

const option2 = () => (numbers(100, 1)).reduce((i, a) => {
    const three = a * 3
    return three % 2 ? three + i : three
  }, 100)
tests.set(option2, 'Option 2: A one loop reducer')


benchmark(1e5, ...tests)
```

| output
| -
| `Option 1: A neat one liner took 1084ms`<br>`Option 2: A one loop reducer took 553ms`
