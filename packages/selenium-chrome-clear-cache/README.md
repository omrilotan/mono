# selenium-chrome-clear-cache [![](https://img.shields.io/npm/v/selenium-chrome-clear-cache.svg)](https://www.npmjs.com/package/selenium-chrome-clear-cache) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/selenium-chrome-clear-cache)

## 🗑 Clear cache of a chrome browser in a Selenium flow

![](https://user-images.githubusercontent.com/516342/41310034-027fbc12-6e89-11e8-95b2-8506b7cd05bc.gif)

```js
const webdriver = require('selenium-webdriver');
const driver = await new Builder().forBrowser('chrome').build();
const clearCache = require('selenium-chrome-clear-cache');

await driver.get('http://www.website.com/login');
await driver.findElement(By.name('username')).sendKeys('admin');
await driver.findElement(By.name('password')).sendKeys('4dM!n', Key.RETURN);
// Web page redirects us
await driver.wait(until.urlIs('http://www.website.com/'), 1000);

await clearCache({webdriver, driver});

await driver.get('http://www.website.com/');
// Gather logged in performance metrics
```

> Uses chrome driver. [Get one](http://chromedriver.storage.googleapis.com/index.html)


## Behaviour and Options

The default behaviour clears the cache and history from the last hour. Options can be applied (in form of named arguments) to configure what the browser should clear

| name | default
| - | -
| cookies | false
| cache | true
| history | true

```js
await clearCache({webdriver, driver}, {cookies: true}); // Also clears the cookies

await clearCache({webdriver, driver}, {history: false}); // Do not clear the history
```

## Measuring page performance example
![image](https://user-images.githubusercontent.com/516342/41311395-d200f8e0-6e8c-11e8-89ac-1e76c4ff283d.png)

