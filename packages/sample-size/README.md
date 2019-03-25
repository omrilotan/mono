# sample-size [![](https://img.shields.io/npm/v/sample-size.svg)](https://www.npmjs.com/package/sample-size) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/sample-size)

## 🎲 pass/fail by sample size
Accepts one decimal fraction

```js
const sample = require('sample-size');

filter(0) // always false

filter(1) // always true

filter(.2) // about 20% true
```

### Usage examples
Report only about 5% of events
```js
sample(.05) && reportEvent();
```

Sample about half of a list
```js
array.filter(() => sample(.5));
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const sample = require('sample-size/dist');
```
