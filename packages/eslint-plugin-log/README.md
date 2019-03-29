# eslint-plugin-log [![](https://img.shields.io/npm/v/eslint-plugin-log.svg)](https://www.npmjs.com/package/eslint-plugin-log) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/eslint-plugin-log)

## 👕 ESLint plugin: log the paths of all files being linted

ESLint does not provide a summary of which or how many files have actually been linted.
Automatic updates and misconfiguration can easily lead to false positive results where not all intended files got actually checked.
By including this plugin in an ESLint configuration, a full list of the files being linted will be output, regardless of (and additionally to) actual linting errors.

![](https://user-images.githubusercontent.com/516342/55211043-5f5bbe80-51fb-11e9-90af-89ebc75779aa.gif)

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

> If ESLint is run with the --format=checkstyle CLI option (as IntelliJ's ESLint integration does), logging filenames is skipped in order to not produce invalid checkstyle XML in the console.
