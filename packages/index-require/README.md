# index-require [![](https://img.shields.io/npm/v/index-require.svg)](https://www.npmjs.com/package/index-require) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/index-require)

## ☝️ Create an index for a lib directory
Scan directory for nested directories and create an index module

Tree
```
├── main.js
└── lib
    ├── index.js
    ├── module1
    │   ├── index.js
    │   └── spec.js
    └── module2
        ├── index.js
        └── spec.js
```

lib/index.js
```js
const inedx = require('index-require');
module.exports = inedx(__dirname);
```

main.js
```js
const {module1, module2} = require('./lib');
```

## App with features structure
app.js
```
 ├── app.js
 ├── feature1
 │   ├── index.js
 │   └── spec.js
 └── feature2
     ├── index.js
     └── spec.js
```

app.js
```js
const inedx = require('index-require');
const {
	feature1,
	feature2,
} = inedx(__dirname);
```

### Optional second argument for different structures
```js
const inedx = require('index-require');
module.exports = inedx(__dirname, name => `./${name}/main.js`);
```


