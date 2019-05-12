# eslint-plugin-log [![](https://img.shields.io/npm/v/eslint-plugin-log.svg)](https://www.npmjs.com/package/eslint-plugin-log) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/eslint-plugin-log)

## 👕 ESLint plugin: log the paths of all files being linted

ESLint does not provide a summary of which or how many files have actually been processed.

Automatic updates and misconfiguration can easily lead to false positive results where not all intended files were actually checked.

By including this plugin in an ESLint configuration, a full list of the files being linted will be output, regardless of (and additionally to) actual lint errors.

![](https://user-images.githubusercontent.com/516342/57578980-24a5a100-749e-11e9-96a8-4aa88ef8f67d.gif)

#### Install
```
npm i -D eslint-plugin-log
```

#### Include in your ESLint configuration
.eslintrc
```
{
  "plugins": [
    "log"
  ],
  ...
}
```

### via CLI
```
eslint --plugin log
```

> Some of [ESLint's output formats](https://eslint.org/docs/user-guide/formatters) are structured (XML, HTML, json, etc.). We don't want to break those, so filename logging is omitted from formats **except** the following:
> - compact
> - stylish
> - unix
