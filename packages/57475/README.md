# 57475 [![](https://img.shields.io/npm/v/57475.svg)](https://www.npmjs.com/package/57475) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/57475)

## 📈 A feature packed StatsD client with plenty of configuration options

### Features
- ✅ StatsD formats: `count`, `time`, `gauge`, `set`, `histogram`
- ✅ Optional prefix (instance)
- ✅ Tags Format: [DataDog](https://docs.datadoghq.com/tagging/#defining-tags), [Carbon](https://graphite.readthedocs.io/en/latest/tags.html#carbon)
- ✅ Instance tags - pre-set tags for an instance or set tags when sending
- ✅ Sampling (sample rate)
- ✅ Protocol versions: `ipv4`, `ipv6`
- ✅ Custom aggregation (Multi-metric packets):
	- MTU (maximum transmission unit)
	- TTL (time to live)
- ✅ More stuff, read on

### Simplest example
```js
const Stats = require('57475');

const client = new Stats({host: '127.0.0.1', port: '8125'});
client.count('my_application_name.visit_count'); // 31 (pending bulk size)
```

### Stats client creation options
| Argument | Type | Default | Meaning
| - | - | - | -
| `host` | String | `'127.0.0.1'` | StatsD host
| `port` | String\|Number | `'8125'` | StatsD port
| `protocol` | String | `'ipv4'` | UDP Internet Protocol (ipv4/ipv6)
| `MTU` | Number | `576` | Maximum transmission size
| `TTL` | Number | `1000` | Maximum time (ms) to wait until flushing waiting metrics in the bulk
| `tags` | Object | _optional_ | Default tags to be sent with every metric
| `tagsStyle` | String | `'DD'` | Style format of tags ('DD' DataDog, and 'CC' CarbonCache)
| `prefix` | String | _optional_ | Optional prefix to attach to all metrics
| `sanitise` | Function | † Default sanitisation | Sanitise metrics (including prefix) and tags
| `errorHandler` | Function | _optional_ | Handle message sending errors (see section 'Throwing errors')

† **Default sanitisation**: Replace all non chars and points with underscore. Lowercase everything

```js
const client = new Stats({
	host: '127.0.0.1',
	port: '8125',
	protocol: 'ipv6',
	MTU: 1432,
	TTL: 2000,
	tags: {environment: 'production'},
	tagsStyle: 'DD',
	sanitise: string => `${string}`.replace(/(?!\.)\W/g, '_').toLowerCase(),
	prefix: 'my_application_name',
});
```

Exposes a client with the functions: `count`, `time`, `gauge`, `set`, `histogram`.

```js
client.count('some.counter');   // Increment by one.
client.time('some.timer', 200); // Send time value in milliseconds
client.time('some.timer', date); // If you send a date instance - it'll report the time diff
client.gauge('some.gauge', 10); // Set gauge to 10
client.set('your.set', 200);
client.histogram('some.histogram', 10, {foo: 'bar'}) // Histogram with tags
```

### Function arguments
| Argument | Type | Default | Meaning
| - | - | - | -
| metric | String | [Mandatory] | The metric name (key)
| value | Number|Date | 1 | The value to report (A date instance will send the time diff)
| options.rate | Number | - | Sample rate - a fraction of 1 (.01 is one percent)
| options.tags | Object | - | Key-value pairs of tags set as object literal

### Use all of the features!
```js
client.time(
	'response_time',
	157,
	{
		rate: .05,
		tags: {
			method: 'GET',
			route: 'users/:user_id',
			status_code: 200,
		},
	}
);
```

## Extended abilities

### Explicit flush
Lets say, for example, you want to send a metric before exiting process, you'll want to flush metrics immediately.
```js
client.flush();
```

### Generic function
A 57475 instance `generic` function accepts same arguments as specific metric emitters with a leading argument of the metric type. This is useful for dynamically sending different types of metrics.
```js
client.generic('count', 'some.counter', 3);
client.generic(Stats.TYPES.timer, 'some.timer', 200);
```

### Static `TYPES`
The static getter `TYPES` helps use types dynamically *and safely*.

## Additional information

### Bulk output example
```
my_application_name.response_time:157|ms@0.05#method:get,route:users__user_id,status_code:200
my_application_name.response_time:182|ms@0.05#method:get,route:users__user_id,status_code:200
my_application_name.response_time:355|ms@0.05#method:post,route:users_change_email,status_code:201
my_application_name.response_time:30|ms#method:get,route:users__user_id,status_code:500
my_application_name.response_time:157|ms@0.05#method:get,route:users__user_id,status_code:200
```

### Throwing errors
The client tries to **throw errors** as early on in the process as possible. To try and prevent mysterious disruption in metrics later in the process, which is harder to discover.

The client aims to perform in an asynchronous and non disruptive manner. That's why the actual sending of the metrics will fail silently, unless instance is supplied with a `errorHandler` option.

The `errorHandler` function will accept two arguments: first is the error and the second is the bulk failed to be sent - for failure analysis.
```js
{
	errorHandler: (error, bulk) => console.error(error, bulk)
}
```

### Recommended MTU buffer sizes
- **By protocol**
	- IPV4: 576
	- IPV6: 1500
- **By speed**
	- Commodity Internet: 512
	- Fast Ethernet: 1432
	- Gigabit Ethernet: 8932
