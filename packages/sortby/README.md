# sortby [![](https://img.shields.io/npm/v/sortby.svg)](https://www.npmjs.com/package/sortby) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/sortby) [![](https://badgen.net/bundlephobia/minzip/@does/sortby)](https://bundlephobia.com/result?p=@does/sortby)

## ⚔️ Sort array of objects by key or function

```js
const sortby = require('@does/sortby');

sortby(
	[
		{name: 'John', age: 30},
		{name: 'Alfred', age: 10},
		{name: 'Paul', age: 20}
	],
	'name',
	{
		order: 'desc',
		modify: name => name.toLowerCase()
	}
);

/*
 * [
 * 	{name: 'Alfred', age: 10},
 * 	{name: 'John', age: 30},
 * 	{name: 'Paul', age: 20},
 * ]
 */
```

| option | type | description | default | example
| - | - | - | - | -
| order | {String} asc/desc | Order of sorting | asc | {order: 'desc'}
| modify | {Function} | modify value before sorting | a => a | {modify: a => a.toLowerCase()}

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const sortby = require('@does/sortby/dist');
```
