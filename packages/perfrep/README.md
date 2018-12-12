# perfrep [![](https://img.shields.io/npm/v/perfrep.svg)](https://www.npmjs.com/package/perfrep) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/perfrep)

Host Performance Report in Percent

```js
const perfrep = require('perfrep');

const {cpu, memory, heap} = await perfrep();

// log to statsd for example
logMetrics(
	...Object.entries(await perfrep())
		.map(
			([key, value]) => `application.host_perf.${key}_usage:${value}|ms|@0.1`
		)
	)
);
```

![](https://user-images.githubusercontent.com/516342/49897016-9af59700-fe5d-11e8-9af3-9013809a6a94.png)

Or take a glance at your own machine
```
npm i -g perfrep

perfrep
```

![](https://user-images.githubusercontent.com/516342/49897116-e740d700-fe5d-11e8-8d59-903bbaf73cfe.png)
