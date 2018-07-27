/**
 * Settings page for clearing cache
 * @type {String}
 */
const PAGE = 'chrome://settings/clearBrowserData';

/**
 * Query selector for shadow DOM: checkbox for clear cookies
 * @type {String}
 */
const COOKIES = '* /deep/ [id="cookiesCheckboxBasic"]';

/**
 * Query selector for shadow DOM: checkbox for clear browsing data
 * @type {String}
 */
const HISTORY = '* /deep/ [id="browsingCheckboxBasic"]';

/**
 * Query selector for shadow DOM: checkbox for clear cache
 * @type {String}
 */
const CACHE = '* /deep/ [id="cacheCheckboxBasic"]';

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
module.exports = async function clearCache({webdriver, driver}, {cookies = false, cache = true, history = true} = {}) {
	if (!(cookies || cache || history)) {
		return;
	}

	const { By, until } = webdriver;

	await driver.get(PAGE);

	await driver.wait(
		until.elementLocated(
			By.js(find, BUTTON)
		),
		3000
	);

	await Promise.all(
		[
			[cookies, COOKIES],
			[cache, CACHE],
			[history, HISTORY],
		].map(
			async ([option, query]) => option || await driver.findElement(By.js(find, query)).click()
		)
	);

	await driver.findElement(
		By.js(find, BUTTON)
	).click();

	await driver.sleep(400);
};
