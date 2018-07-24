# transparent-pixel [![](https://img.shields.io/npm/v/transparent-pixel.svg)](https://www.npmjs.com/package/transparent-pixel) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/transparent-pixel)

One transparent pixel

## Serve a transparent pixel with express.js:

```js
const express = require('express');
const pixel = require('transparent-pixel');

const app = express();

app.get('/pixel/:metric', (request, response) => {
	report(request.params.metric); // your own logic

	response
		.status(201)
		.type('gif')
		.send(pixel);
});
```
