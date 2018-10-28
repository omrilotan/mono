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
