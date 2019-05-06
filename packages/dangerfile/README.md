# dangerfile [![](https://img.shields.io/npm/v/dangerfile.svg)](https://www.npmjs.com/package/dangerfile) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/dangerfile)

## 🚨 Centralised [Dangerfile](https://danger.systems/js/)

### CLI
Create a dangerfile and run it. (Installs [danger](https://www.npmjs.com/package/danger) if missing)

```
npx dangerfile
```

### Create your own CLI using this as a module
Add this bin right next to your dangerfile (dangerfile.js)
```js
#!/usr/bin/env node

const dangerfile = require('dangerfile');

(async() => {
	try {
		const message = await dangerfile(__dirname);
		console.info(message);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
```

The script prioritises local dangerfile above introduced one, unless 'force' flag was passed

```js
await dangerfile(__dirname, {force: true});
```
