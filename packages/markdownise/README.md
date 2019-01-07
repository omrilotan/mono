# markdownise [![](https://img.shields.io/npm/v/markdownise.svg)](https://www.npmjs.com/package/markdownise) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/markdownise) [![](https://badgen.net/bundlephobia/minzip/markdownise)](https://bundlephobia.com/result?p=markdownise)

> WIP

## Represent data structures in markdown

### Examples:

#### Table
```js
[
	{a: 1, b: 2, c: 3},
	{a: 2, b: 3, c: 4},
	{a: 3, b: 4, c: 5},
]
```

```md
| a | b | c
| - | - | -
| 1 | 2 | 3
| 2 | 3 | 4
| 3 | 4 | 5
```

## Bundled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes a bundled ES5 commonjs module.

Also available for explicit import:
```js
const markdownise = require('markdownise/dist');
```
