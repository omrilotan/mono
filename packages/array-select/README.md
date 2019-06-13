# array-select [![](https://img.shields.io/npm/v/array-select.svg)](https://www.npmjs.com/package/array-select) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/array-select)

## 🚬 Extract items from one array into two or more arrays by results of a provided function

```js
const arraySelect = require('array-select');

const [odd, even] = arraySelect(
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	i => i % 2
);
```

### Arguments
```
const results = arraySelect(Array, Function[, ...Functions]);
```

Functions accept three parameters (just like all array iterator functions):
- `element {Any}`: The current element being processed in the array
- `index   {Number}` : The index of the current element being processed in the array.
- `array   {Array}` The array being processed

The function should return a truthy or falsy value (coerced into a boolean for testing purposes)

Passing one function will create two arrays
```js
const [odd, even] = arraySelect(
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	i => i % 2
);

odd  // [1, 3, 5, 7, 9]
even // [2, 4, 6, 8, 10]
```

Passing more than one function will result in same number of arrays. Elements can be included in more than one result array
```js
const [adult, male] = arraySelect(
	[
		{gender: 'male', age: 8},
		{gender: 'male', age: 64},
		{gender: 'female', age: 14},
		{gender: 'male', age: 21},
		{gender: 'female', age: 32},
	],
	({age}) => age > 18,
	({gender}) => gender === 'male',
);

adult // [{gender: 'male', age: 64}, {gender: 'male', age: 21}, {gender: 'female', age: 32}]
male  // [{gender: 'male', age: 8}, {gender: 'male', age: 64}, {gender: 'male', age: 21}]
```

A callback function that uses more arguments
```js
const [original, duplicates] = split(
	[1, 1, 2, 3, 4, 1, 3, 8],
	(item, index, array) => index === array.indexOf(item)
);

original   // [1, 2, 3, 4, 8]
duplicates // [1, 1, 3]
```

## Transpiled version
Environments which exclude node_modules from the transpiling pipeline should include the "browser" entry instead of "main". This exposes an ES5 commonjs module.

Also available for explicit import:
```js
const arraySelect = require('array-select/dist');
```
