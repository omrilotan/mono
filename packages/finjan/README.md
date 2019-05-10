# finjan [![](https://img.shields.io/npm/v/finjan.svg)](https://www.npmjs.com/package/finjan) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/finjan)

## ☕️ Just test harmony modules

> Work in progress

```
finjan file.mjs another-file.mjs --require finjan.mjs
```

Pass in filenames to import as tests. Uses `describe` and `it` just like mocha

### Options

| name | Value
| - | -
| require | one or more files to import before the tests
