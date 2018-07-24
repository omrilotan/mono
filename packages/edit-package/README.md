# edit-package [![](https://img.shields.io/npm/v/edit-package.svg)](https://www.npmjs.com/package/edit-package) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/edit-package)

Read, write and reset package.json

```js
const {
	read,
	write,
	reset,
} = require('edit-package')

const { version } = await read()

// Change a value
await write({publishConfig: {tag: 'next'}})

// Reset to original value

await reset()
```
