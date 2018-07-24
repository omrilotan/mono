# boxt [![](https://img.shields.io/npm/v/boxt.svg)](https://www.npmjs.com/package/boxt) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/boxt)

<p align="center"><img width="363" alt="boxt" src="https://user-images.githubusercontent.com/516342/34468260-c7ab5682-ef0d-11e7-8a84-c9baa16cabaa.png"></p>

<p align="center"><img alt="boxt" src="https://user-images.githubusercontent.com/516342/35348313-5c858bf8-0140-11e8-9cee-a8336896f56a.png"></p>

## Use
`npm i -S boxt`

```js
const boxt = require('boxt');

boxt(`I have a message
It might be multilined`);
```

## Options
```js
boxt(
	'Guests, like fish, begin to smell after three days.',
	{
		color: 'green',
		theme: 'round',
		padding: 4,
	}
);
```

| option | meaning | values
| --- | --- | ---
| title | A title | And string
| theme | border style | 'single' (default), 'double', 'round'
| color | border colour | see [`colors` on NPM](https://www.npmjs.com/package/colors)
| padding | space from borders to text |
| align | Where to align the lines | 'center' (default), 'left'/'start', 'right'/'end'

## Examples

| options | result |
| --- | --- |
| **theme**: `'double'`<br>**color**: `'bgBlue'` | <img width="420" alt="example" src="https://user-images.githubusercontent.com/516342/34468263-dcb7e87e-ef0d-11e7-9ae6-1f44d144a1b1.png"> |
| **theme**: `'round'`<br>**color**: `'green'` | <img width="402" alt="example" src="https://user-images.githubusercontent.com/516342/34468268-f85f6d40-ef0d-11e7-9fc5-746cd20f4e25.png"> |
| **padding**: `10`<br>**align**: `'left'` | <img width="371" alt="example" src="https://user-images.githubusercontent.com/516342/35336411-01797bb2-0121-11e8-931f-03a7ff9df225.png"> |
| **title** `'I am the title'.bold` | <img width="167" alt="example" src="https://user-images.githubusercontent.com/516342/36678556-c1d0ead2-1b19-11e8-8fb5-1557e3cf907e.png">

