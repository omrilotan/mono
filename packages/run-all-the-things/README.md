# run-all-the-things [![](https://img.shields.io/npm/v/run-all-the-things.svg)](https://www.npmjs.com/package/run-all-the-things) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/run-all-the-things)

## 👟 Run scripts in parallel

### CLI runs NPM scripts
```
npm i run-all-the-things -D
```

And run in NPM scripts
```
things test lint
```

### Use as an NPX module without installing
```
npx run-all-the-things test lint
```

### Package executes shell commands in parallel
```js
const run = require('run-all-the-things');

await run([
	'npm t',
	'npm run lint',
	'echo "number three"'
]);

```
