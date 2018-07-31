# [WIP] jsnpm [![](https://img.shields.io/npm/v/jsnpm.svg)](https://www.npmjs.com/package/jsnpm) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/jsnpm)

NPM API for application workflow

## exists

{Boolean} Does this package exist?
```js
const {exists} = require('jsnpm');

async exists('@me/my-package') // true | false
```

## latest
{String} Get the latest version of a package
```js
const {latest} = require('jsnpm');

async latest('@me/my-package') // '3.3.3'
```

## publish
{void} Publish the hosting package we're running in (runtime directory)
```js
const {publish} = require('jsnpm');

async publish()
```

## setTag
{void} Set a version to a tag
```js
const {setTag} = require('jsnpm');

async setTag('@me/my-package', '2.2.2', 'latest') // ['0.0.0', '1.1.1', '2.2.2', '3.3.3']
```

## versions
{Array} Get all published versions of a package
```js
const {latest} = require('jsnpm');

async latest('@me/my-package') // ['0.0.0', '1.1.1', '2.2.2', '3.3.3']
```
