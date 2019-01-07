# levelheaded [![](https://img.shields.io/npm/v/levelheaded.svg)](https://www.npmjs.com/package/levelheaded) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/levelheaded) [![](https://badgen.net/bundlephobia/minzip/levelheaded)](https://bundlephobia.com/result?p=levelheaded)

## ⚖️ Generate object containing functions deemed operational by level

| Option | Type | Meaning | Default
| - | - | - | -
| levels | Array[String] | Levels will become functions | `[ 'debug', 'verbose', 'info', 'warn', 'error', 'critical' ]`
| minimal | String | Minimal level to execute | `levels[0]`
| action | Function | The action to execute when minimal level was matched | `console.log`

```js
import levelheaded from 'levelheaded';

const log = levelheaded({
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

log.debug('Something trivial'); // ⛔️ Won't fire
log.error('Something I need to know'); // ✅ Will fire
```

## Custom levels
```js
const log = levelheaded({
	levels: ['a', 'b', 'c'],
	minimal: 'b',
});

log.a('Something'); // ⛔️ Won't fire
log.b('Something'); // ✅ Will fire
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const reduce = require('levelheaded/dist');
```
