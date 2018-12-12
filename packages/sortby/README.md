# sortby [![](https://img.shields.io/npm/v/sortby.svg)](https://www.npmjs.com/package/sortby) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/sortby)

## Sort array of objects by key or function

```js
const sortby = require('@does/sortby');

sortby([{name: 'Alfred', age: 10}, {name: 'John', age: 30}, {name: 'Paul', age: 20}], 'age', {order: 'desc'});
// [{name: 'John', age: 30}, {name: 'Paul', age: 20}, {name: 'Alfred', age: 10}]
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const sortby = require('@does/sortby/dist');
```
