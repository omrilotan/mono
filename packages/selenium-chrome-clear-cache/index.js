/**
 * Settings page for clearing cache
 * @type {String}
 */
const PAGE = 'chrome://settings/clearBrowserData';

/**
 * Query selector for shadow DOM: checkbox for clear browsing data confirmation
 * @type {String}
 */
const CHECKBOX = '* /deep/ [label*="Cookies"]';

/**
 * Query selector for shadow DOM: Submit buttons
 * @type {String}
 */
const BUTTON = '* /deep/ #clearBrowsingDataConfirm';

/**
 * Query selector function
 * @param  {string} selector
 * @return {HTMLElement}
 */
const find = (selector) => document.querySelector(selector);

/**
 * Clear the cache of a chrome browser
 * @param  {Object} options.webdriver Selenium web driver API
 * @param  {Driver} options.driver    Selenium Driver instance
 * no return value
 *
 * @example
 * const webdriver = require('selenium-webdriver');
 * const driver = await new Builder().forBrowser('chrome').build();
 *
 * await clearCache({webdriver, driver});
 */
module.exports = async function clearCache({webdriver, driver}) {
    const { By, until } = webdriver;

    await driver.get(PAGE);

    await driver.wait(
        until.elementLocated(
            By.js(find, BUTTON)
        ),
        3000
    );

    await driver.findElement(
        By.js(find, CHECKBOX)
    ).click();

    const button = driver.findElement(
        By.js(find, BUTTON)
    ).click();

    await driver.sleep(400);
};
