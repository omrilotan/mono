# reverse-dns-lookup [![](https://img.shields.io/npm/v/reverse-dns-lookup.svg)](https://www.npmjs.com/package/reverse-dns-lookup) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/reverse-dns-lookup)

## 🕵 Verify an IP is related to a certain domain

You can verify if a web crawler accessing your server really is who they claim they are. This is useful if you're concerned that spammers or other troublemakers are accessing your site while claiming to be known crawlers. Crawlers do not post public lists of IP addresses to whitelist. This is because these IP address ranges can change, causing problems for any systems who have hard-coded them, so you must run a DNS lookup as described next.

```




                                                                   🕷

```

Example flow to verify Googlebot as the caller
```js
const reverseDNSLookup = require('reverse-dns-lookup');

let googlebot = /googlebot/i.test(request.headers['user-agent']);

if (googlebot) { // It says it's Googlebot
	const ip = request.headers['x-forwarded-for'];
	googlebot = await reverseDNSLookup(ip, 'google.com', 'googlebot.com'); // Okay, it's Googlebot
}
```

### What just happened?
1. Run a reverse DNS lookup on the accessing IP address.
2. Verify that the domain name is in the supplied domain names.
3. Run a forward DNS lookup on the retrieved domain name (from step 1).
4. Verify that it is the same as the original accessing IP address from your logs.

In case you want explicit details, use `.source` interface
```js
const ip = request.headers['x-forwarded-for'];
try {
	await reverseDNSLookup.source(ip, 'google.com', 'googlebot.com')
	googlebot = true;
} catch (error) {
	if (error.name === 'ReverseDNSLookupError') {
		logger.info(`Googlebot imposter: ${error.message}`);
		googlebot = false;
	} else {
		throw error;
	}
}
```

### CLI

```
reverse-dns-lookup 66.249.66.1 google.com googlebot.com
```

| Checks out
| -
| `66.249.66.1 checks up with google.com, googlebot.com`
| Exit code 0

------

| Does not check out okay
| -
| `ReverseDNSLookupError: 1.1.1.1 does not match domain google.com, googlebot.com. (resolves to one.one.one.one.)`
| Exit code 1

                                        🕷
