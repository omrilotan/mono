# levelheaded [![](https://img.shields.io/npm/v/levelheaded.svg)](https://www.npmjs.com/package/levelheaded) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/levelheaded) [![](https://badgen.net/bundlephobia/minzip/levelheaded)](https://bundlephobia.com/result?p=levelheaded)

## ⚖️ Generate object containing functions deemed operational by level

Assigns functions by level. Functions lower than the minimal level will be assigned with _no operation_, while minimal level and above are assigned the desired operation.

| Option | Type | Meaning | Default
| - | - | - | -
| levels | Array[String] | Levels will become functions | `[ 'debug', 'verbose', 'info', 'warn', 'error', 'critical' ]`
| minimal | String | Minimal level to execute | `levels[0]`
| action | Function | The action to execute when minimal level was matched | `console.log`
| object | Object | An object to assign the functions on | `{}`
| noop | Function | Function to call when event should **not** be triggered | `()=>undefined`

> ℹ️ All options are optional

```js
import levelheaded from 'levelheaded';

const logger = levelheaded({
	minimal: isDevelopment() ? 'debug' : 'warn',
	action: function (message) {
		fetch(
			'https://error.logger.com',
			{
				method: 'POST',
				body: JSON.stringify({
					message,
					url: document.location.href,
					level: this.level,
				})
			}
		);
	}
})

logger.debug('Something trivial'); // ⛔️ Won't fire
logger.error('Something I need to know'); // ✅ Will fire
```

## Custom levels
```js
const logger = levelheaded({
	levels: ['a', 'b', 'c'],
	minimal: 'b',
});

logger.a('Something'); // ⛔️ Won't fire
logger.b('Something'); // ✅ Will fire
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const levelheaded = require('levelheaded/dist');
```
