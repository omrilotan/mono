# jsnpm [![](https://img.shields.io/npm/v/jsnpm.svg)](https://www.npmjs.com/package/jsnpm) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/jsnpm)

NPM API for application workflow

## exists
{Boolean} Does this package exist?
```js
const {exists} = require('jsnpm');

async exists('@me/my-package') // true | false
async exists('@me/my-package', 'next') // true | false
```

## getVersion
{String} Get the version of a tag in a package
```js
const {getVersion} = require('jsnpm');

async getVersion('@me/my-package', 'next') // '1.7.9-rc-5fca53d'
```

## latest
{String} Get the latest version of a package
```js
const {latest} = require('jsnpm');

async latest('@me/my-package') // '3.3.3'
```

## publish
{void} Publish the hosting package we're running in (runtime directory). Throws error when publish fails
```js
const {publish} = require('jsnpm');

try {
	async publish()
	console.log('Published successfully')
} catch (error) {
	console.error(error)
}
```

## unpublish
{String} Unpublish an existing package. Optionally add a versioe to unpublish. Returns unpublished version.
```js
const {unpublish} = require('jsnpm');

try {
	async unpublish('@me/my-package', '1.1.1') // - @me/my-package@1.1.1
	console.log('Unpublished successfully')
} catch (error) {
	console.error(error)
}
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

## config
{void} Set a configuration for the "npm" instance we're working on
```js
const {config} = require('jsnpm');

await config('registry', 'https://company.jfrog.io/company/api/npm/npm-company/')
```
