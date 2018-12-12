# percent [![](https://img.shields.io/npm/v/@does/percent.svg)](https://www.npmjs.com/package/@does/percent) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/percent)

## A round percentage of a number from the whole

```
const percent = require('@does/percent');

// percent(part, whole):

percent(150, 200) // 75
percent(200, 150) // 133
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const percent = require('@does/percent/dist');
```
