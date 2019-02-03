# handle-rejection [![](https://img.shields.io/npm/v/handle-rejection.svg)](https://www.npmjs.com/package/handle-rejection) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/handle-rejection)

## 💀 Handle unhandled rejections

### Built in single handlers
```js
require('handle-rejection').console(); // console.error(error)
```

| Name | Details
| - | -
| console | console.error
| exit | process.exit
| throw | throws error
| collect | Prints all errors before process exists

### Combine handlers
```js
require('handle-rejection')(
	'console',
	'collect'
);
```
> This one is a good combination for long test suits (see below) †

### Custom handlers
```js
const errobj = require('errobj');

require('handle-rejection')(
	error => fetch(
		'/report-error',
		{
			method: 'POST',
			body: JSON.stringify(errobj(error))
		}
	)
);
```

### Combined handlers: built in and custom
```js
require('handle-rejection')(
	error => Raven.captureException(error) // custom
	'exit', // built in
);
```

---

> † Example for a combination of "console" and "collect" in a testing environment

```
> mocha

  some function
    ✓ Should be okay
TypeError: Cannot read property 'ok' of undefined
    at ok (/workspace/package/spec.js:21:11)
    at tryCatch (/workspace/package/node_modules/regenerator-runtime/runtime.js:45:40)
    at Generator.invoke [as _invoke] (/workspace/package/node_modules/regenerator-runtime/runtime.js:271:22)
    at Generator.prototype.(anonymous function) [as next] (/workspace/package/node_modules/regenerator-runtime/runtime.js:97:21)
    at asyncGeneratorStep (/workspace/package/spec.js:14:103)
    at _next (/workspace/package/spec.js:16:194)
    at process._tickCallback (internal/process/next_tick.js:68:7)

  some other function
    ✓ Should success
    ✓ Should also success
    ✓ Should really work

  another bulk of tests
    ✓ Should be fine
    ✓ Should pass the test

  6 passing (110ms)

╭─────────────────────────────╮
│ Unhandled Rejection Summary │
╰─────────────────────────────╯

❗️ Rejection 1:
TypeError: Cannot read property 'ok' of undefined
    at ok (/workspace/package/spec.js:21:11)
    at tryCatch (/workspace/package/node_modules/regenerator-runtime/runtime.js:45:40)
    at Generator.invoke [as _invoke] (/workspace/package/node_modules/regenerator-runtime/runtime.js:271:22)
    at Generator.prototype.(anonymous function) [as next] (/workspace/package/node_modules/regenerator-runtime/runtime.js:97:21)
    at asyncGeneratorStep (/workspace/package/spec.js:14:103)
    at _next (/workspace/package/spec.js:16:194)
    at process._tickCallback (internal/process/next_tick.js:68:7)
```
