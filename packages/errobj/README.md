# errobj [![](https://img.shields.io/npm/v/errobj.svg)](https://www.npmjs.com/package/errobj) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/errobj)

## ☠️ Serialise errors to literal (JSONable) object

- ✔︎ Designed for error loggers
- ✔︎ Serialises errors to literal objects
- ✔︎ Supports **any** properties attached to the error
- ✔︎ Expands the error details with lineNumber, columnName, fileName, functionName, ...
- ✔︎ Parses the stack trace ([error-stack-parser](https://www.npmjs.com/package/error-stack-parser))
- ✔︎ Isomorphic

```js
const errobj = require('errobj');

const original_onerror = window.onerror;
window.onerror = function(message, url, lineNumber, columnNumber, error) {

	Object.assign(
		error,
		{message, url, lineNumber, columnNumber}
	);

	fetch(
		'/error-logger',
		{
			method: 'POST',
			body: JSON.stringify(
				errobj(error)
			)
		}
	);

	original_onerror(message, url, lineNumber, columnNumber, error);
}
```

### Example serialised error
```js
{
	name: 'RangeError',
	message: 'Nothing',
	stack: 'ReferenceError: something is not defined\nat change (index.html:46)\nat index.html:53\nat index.html:56',
	lineNumber: '46',
	columnNumber: '12',
	fileName: 'index.html',
	functionName: 'change',
	source: 'at change (index.html:46)',
	details: {
		parsedStack: [
			{
				lineNumber: 46,
				fileName: 'index.html',
				functionName: 'change',
				source: 'at change (index.html:46)'
			},
			{
				lineNumber: 53,
				fileName: 'index.html',
				source: 'at index.html:53'
			},
			{
				lineNumber: 56,
				fileName: 'index.html',
				source: 'at index.html:56'
			}
		]
	}
}
```

## Bundled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes a bundled ES5 commonjs module.

Also available for explicit import:
```js
const errobj = require('errobj/dist');
```
