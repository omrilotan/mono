# notate [![](https://img.shields.io/npm/v/notate.svg)](https://www.npmjs.com/package/notate) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/notate)

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

notate(obj, 'top_level.nested.value') // 'My Value'

notate(obj, 'top_level.missing.value') // undefined
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const notate = require('notate/dist');
```
