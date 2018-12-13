# handle-rejection [![](https://img.shields.io/npm/v/handle-rejection.svg)](https://www.npmjs.com/package/handle-rejection) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/handle-rejection)

## 💀 Handle unhandled rejections

Built in single handlers
```js
require('handle-rejection').console(); // console.error(error)
require('handle-rejection').exit(); // process.exit(1)
require('handle-rejection').throw(); // throw error
```

Combined handlers (built in and custom)
```js
require('handle-rejection')(
	error => Raven.captureException(error) // custom
	'exit', // built in
);
```
