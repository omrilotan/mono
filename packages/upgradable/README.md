# Upgradable [![](https://img.shields.io/npm/v/upgradable.svg)](https://www.npmjs.com/package/upgradable) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/upgradable)

"Upgradable" runs in a background child process and checks for updates in your CLI package.
If there's a new version available - at end of interaction, when user sends interrupt signal (ctrl+c), it will prompt your users to upgrade your node CLI tool.

Use
```js
const upgradable = require('upgradable');
const { name, version } = require('./package.json');

upgradable({name, version});
```

Shorthand
```js
require('upgradable')(require('./package.json'));
```

![image](https://user-images.githubusercontent.com/516342/36352483-6a5c780a-14c2-11e8-974d-9eebb0083e59.png)

### options

#### `message` (Optional)
```js
upgradable({name, version, message: 'This is my own inspirational message'});
```
<img width="386" alt="image" src="https://user-images.githubusercontent.com/516342/36252458-59387a00-124d-11e8-86f5-31d6eaf94f3d.png">
