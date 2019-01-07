# assign <a href="https://www.npmjs.com/package/@recursive/assign"><img src="https://img.shields.io/npm/v/@recursive/assign.svg"></a> [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/assign) [![](https://badgen.net/bundlephobia/minzip/@recursive/assign)](https://bundlephobia.com/result?p=@recursive/assign)

Recursive assign for objects, arrays and more

```js
const assign = require('@recursive/assign');

assign({hash: {a: 1}}, {hash: {b: 2, c: 0}}, {hash: {c: 3}}) // {hash: {a: 1, b:2, c: 3}}
```

I will merge:
 - ✔ objects
 - ✔ arrays
 - ✔ functions
 - ✔ sets
 - ✔ maps

Array
```js
assign(
	{array: [1, 2]},
	{array: [3, 4]}
)
// {array: [1, 2, 3, 4]}
```

Array of assignable members
```js
assign(
    [{firstName: 'Omri'}, {firstName: 'Tom'}],
    [{lastName: 'Lotan'}, {lastName: 'Ben Amitai'}]
)
// [{firstName: 'Omri', lastName: 'Lotan'}, {firstName: 'Tom', lastName: 'Ben Amitai'}]
```

Set
```js
assign(
	{set: new Set([1, 2])},
	{set: new Set([2, 3])}
);
// {set: [1, 2, 3]}
```

Map
```js
assign(
	{map: new Map([[1, 2], [3, 4]])}
	{map: new Map([[1, 3], [4, 5]])}
);
// {map: [[1, 3], [3, 4], [4, 5]]}
```


## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const assign = require('@recursive/assign/dist');
```
