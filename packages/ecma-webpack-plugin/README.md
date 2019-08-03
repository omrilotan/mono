# ecma-webpack-plugin [![](https://img.shields.io/npm/v/ecma-webpack-plugin.svg)](https://www.npmjs.com/package/ecma-webpack-plugin) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/ecma-webpack-plugin)

Verify your output code is compliant to the version you're targeting.

This is useful for cases when you want to be sure your babel options get you covered and especially if you exclude node modules directory like the [official babel recommendation](https://babeljs.io/setup#via-config) (I mean, why would you exclude the packages you don't control?).

### Example webpack.config.js
```js
const EcmaPlugin = require('ecma-webpack-plugin');

module.exports = {
	...
	plugins: [
		...,
		new EcmaPlugin({parser: {ecmaVersion: '5'}})
  ]
};
```

### Options:

| Options | Meaning | defaults
| - | - | -
| parser | [Parser options (Acorn)](https://github.com/acornjs/acorn/tree/master/acorn#readme) | [Acorn defaults](https://github.com/acornjs/acorn/tree/master/acorn#interface)
| extensions | File extensions to verify | `['js', 'mjs']`
