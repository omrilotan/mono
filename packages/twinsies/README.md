# [WIP] Twinsies [![](https://img.shields.io/npm/v/twinsies.svg)](https://www.npmjs.com/package/twinsies) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/twinsies)

Pluggable file copier

```js
const Twinsies = require('twinsies')

new Twinsies({
	source: './src',
	target: './dist',
	matches: [
		/.*\.json/,
		/.*\.yml/
	],
	process: string => string.replace(/<SERVICE_NAME>/g, 'My Awesome Service')
}).register(
	(...files) => console.log(
		files.map(file => `Written ${file}`).join('\n')
	)
).start()
```
