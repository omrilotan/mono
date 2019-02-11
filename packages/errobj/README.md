# errobj [![](https://img.shields.io/npm/v/errobj.svg)](https://www.npmjs.com/package/errobj) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/errobj)

## ☠️ Serialise errors to literal (JSONable) object

- ✔︎ Designed for error loggers
- ✔︎ Serialises errors to literal objects
- ✔︎ Supports **any** properties attached to the error
- ✔︎ Expands the error details with lineNumber, columnName, fileName, functionName, ...
- ✔︎ Accepts an enrichment object
- ✔︎ Parses the stack trace ([error-stack-parser](https://www.npmjs.com/package/error-stack-parser))
- ✔︎ Isomorphic

### TL;DR

```js
import errobj from 'errobj';

try {
	some broken code
} catch (error) {
	send(JSON.stringify(errobj(error)));
}
```

#### Arguments
1. `{Error}` (error) An error to be serialised
2. `{Object}` (enrichment) [_optional_] - This object's field values will be assigned to the serialised error
3. `{Object}` (options) [_optional_, _nullable_] - See details below
	- `{Number}` offset [_optional_] - Offset the parsed stack, and error position details. Good for middleware created error objects.
	- `{Boolean}` parsedStack [_optional_] - Add a parsed stack of the error

### Example: Sending uncaught error to an HTTP error logger

```js
const errobj = require('errobj');

const original_onerror = window.onerror; // play nicely
window.onerror = function(message, url, lineNumber, columnNumber, error) {
	fetch(
		'/error-logger',
		{
			method: 'POST',
			body: JSON.stringify(
				errobj(error, {message, url, lineNumber, columnNumber, level: 'error'})
			)
		}
	);

	original_onerror(message, url, lineNumber, columnNumber, error);
}
```

## Examples

### The serialised error
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
	level: 'error'
}
```

### Add fields to the parsed object
```js
errobj(error, {flow: 'registration'});
```

### option: offset
```js
function verboseLog(message) {
	const error = new Error(message);
	send(errobj(error, null, {offset: 1}));
}
```

### option: parsedStack
```js
errobj(error, null, {parsedStack: true});

{
	...
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
	],
	...
}
```

## Bundled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes a bundled ES5 commonjs module.

Also available for explicit import:
```js
const errobj = require('errobj/dist');
```
