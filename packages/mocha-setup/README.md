# mocha-setup [![CircleCI](https://circleci.com/gh/omrilotan/mocha-setup.svg?style=svg)](https://circleci.com/gh/omrilotan/mocha-setup)
🚨 A mocha require file including some basic things I usually use

This setup includes the globals:
- chai functions: assert, expect
- sinon
- sinon function: spy, fake, stub
- abuser

It also extends chai with:
- chai-as-promised
- chai-string
- deep-equal-in-any-order
- sinon-chai

package.json
```json
  ...
  "test": "mocha '**/spec.js' --require .mocha.js --recursive --exclude 'node_modules'",
  ...
```

.mocha.js
```js
require('mocha-setup');

// Your other things
process.on('unhandledRejection', error => { throw error; });
```

.eslintrc.js
```js
const globals = require('mocha-setup/globals');

module.exports = {
	...
	overrides: [
		{
			files: [ "**/spec.js" ],
			globals
		}
	]
};
```

Or add to your own globals
```js
			...
			globals: Object.assign(globals, {...})
		}
```
