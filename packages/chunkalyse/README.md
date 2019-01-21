# chunkalyse [![](https://img.shields.io/npm/v/chunkalyse.svg)](https://www.npmjs.com/package/chunkalyse) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/chunkalyse)

## 🍰 Summarise webpack entries from stats output file

Analyzes [Webpack](https://webpack.js.org/) bundle size

| <img width="260" src="https://user-images.githubusercontent.com/516342/49396538-12cb0f80-f742-11e8-8503-8a459761c9fb.png">
| -

This utility uses [Webpack's generated stats file](https://webpack.js.org/api/stats/).
```
webpack --profile --json > stats.json
```

Is analyses chunks and modules according to the structure output from your Webpack version and configuration.

Supports:

- ✔︎ Webpack stats 📦
- ✔︎ multiple entries 👯
- ✔︎ [multiple configurations ⛓](https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations)
- ✔︎ loaders ⏳
- ✔︎ CLI output formats 🖨
	- `human` (default, see below)
	- `json`


### CLI
Pipe stats
```sh
webpack --config webpack.config.js --profile --json | npx chunkalyse
```
Pass file route
```sh
webpack --config webpack.config.js --profile --json > stats.json
npx chunkalyse stats.json
```

Install globally for continues use
```sh
npm i -g chunkalyse
webpack --config webpack.config.js --profile --json | chunkalyse
```

#### Output formats (examples)

##### View in CLI, descending in size
```
$ chunkalyse stats.json

main (331.2 kB)
 • self: 243.8 kB (74%)
 • core-js: 38.8 kB (12%)
 • prop-types: 26.5 kB (8%)
 ...
```

##### Write JSON to a file
```sh
$ chunkalyse stats.json --format json > chunkalised.json
```

### Module delivers object with named entries
```js
const chunkalyse = require('chunkalyse');
const stats = require('./stats.json');

chunkalyse(stats); // Named summaries (one for each entry point)

{
  main: {
    size: 331215,
    modules: {
      'core-js': {
        size: 38776,
        percent: 12
      },
      self: {
        size: 243771,
        percent: 74
      },
      'style-loader': {
        size: 12465,
        percent: 4
      },
      ...
    }
  }
}
```

### Multiple entries or [multiple configurations](https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations) example
```js
{
  moduleA: { size: 3461, modules: { ... } },
  moduleB: { size: 2533, modules: { ... } },
  moduleC: { size: 3574, modules: { ... } }
}
```

### Thanks
This project uses stats from other projects for research and testing purposes:
- [butter-toast](https://github.com/ealush/butter-toast)
- [emoji-picker-react](https://github.com/ealush/emoji-picker-react)
- [react-dates](https://github.com/airbnb/react-dates)
