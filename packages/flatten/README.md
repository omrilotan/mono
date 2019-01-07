# flatten [![](https://img.shields.io/npm/v/@recursive/flatten.svg)](https://www.npmjs.com/package/@recursive/flatten) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/flatten) [![](https://badgen.net/bundlephobia/minzip/@recursive/flatten)](https://bundlephobia.com/result?p=@recursive/flatten)

## Flatten arrays of arrays, as long as all the members are arrays
```js
const flatten = require('@recursive/flatten');

flatten([
	[
		[1, 2, 3],
		[4, 5, 6],
	],
	[
		[1, 2, 3],
		[4, 5, 6],
	],
	[
		[1, 2, 3],
		[4, 5, 6],
	],
]);
// [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const flatten = require('@recursive/flatten/dist');
```
