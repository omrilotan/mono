# abuser [![](https://img.shields.io/npm/v/abuser.svg)](https://www.npmjs.com/package/abuser) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/abuser)

## 🤕 Create modifiers to require cache based on file path (e.g. `__filename`)

The `abuser` function accepts routes from which to resolve the modules as arguments
```js
const abuser = require('abuser');
const {clean, override, reset} = abuser(__filename);
```

### `override`: Override module exports value with any given thing (other than `undefined`)
```js
const {override} = require('abuser')(__filename);

override('modulename', () => 'return value');
```

### `reset`: Reset module cache to intended values, recursively
```js
const {reset} = require('abuser')(__filename);

const myThing = reset('.');
```


### `clean`: Clean module and its dependencies from memory
```js
const {clean} = require('abuser')(__filename);

clean('.');
```

```js
const {override, clean} = require('abuser')(__filename);

describe('my suite', () => {
	const dependency = stub();
	let mine;
	before(() => {
		override('dependency', dependency);
		mine = require('.');
	});
	afterEach(() => stub.reset());
	after(() => clean('.'));

	it('Should call "dependency"', () => {
		mine();
		assert(dependency.called);
	});
});
```
