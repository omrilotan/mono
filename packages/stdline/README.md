# stdline [![](https://img.shields.io/npm/v/stdline.svg)](https://www.npmjs.com/package/stdline) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/stdline)

## 💬 Update current STDOUT stream

![](https://user-images.githubusercontent.com/516342/49694510-3227c980-fb94-11e8-9d17-3638cc64633f.gif)


Work on current line
```js
const {
	update,
	end,
} = require('stdline');

console.log('processing:');
...

update('Got an update for you');
...
end('Finished!');
```

Clear screen
```js
const { clear } = require('stdline');

clear();
```
