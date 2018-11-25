# chunkalyse [![](https://img.shields.io/npm/v/chunkalyse.svg)](https://www.npmjs.com/package/chunkalyse) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/chunkalyse)

## Summarise webpack entries from stats output file

### CLI
Pipe stats
```sh
npm i -g chunkalyse
webpack --config webpack.config.js --profile --json | chunkalyse
```

Pass file route
```sh
webpack --config webpack.config.js --profile --json > stats.json
npx chunkalyse stats.json
```
#### Example output (styled in CLI, descending)
```
main (9.7 kB)
 • await-reduce: 3.5 kB (36%)
 • @recursive/assign: 3.4 kB (35%)
 • paraphrase: 2.5 kB (25%)
 • self: 354 B (4%)
```

### Module delivers un-styled data
```js
const chunkalyse = require('chunkalyse');
const stats = require('./stats.json');

chunkalyse(stats); // Array of summaries (one for each entry point)
```
#### Output
```js
{
  "main": {
    "size": 9737,
    "modules": {
      "self": {
        "size": 354,
        "percent": 4
      },
      "@recursive/assign": {
        "size": 3398,
        "percent": 35
      },
      "await-reduce": {
        "size": 3516,
        "percent": 36
      },
      "paraphrase": {
        "size": 2469,
        "percent": 25
      }
    }
  }
}
```
