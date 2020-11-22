/**
 * Settings page for clearing cache
 * @type {String}
 */
const PAGE = 'chrome://settings/clearBrowserData';

/**
 * Query selector for shadow DOM: checkbox for clear cookies
 * @type {String}
 */
const COOKIES = 'cookiesCheckboxBasic';

/**
 * Query selector for shadow DOM: checkbox for clear browsing data
 * @type {String}
 */
const HISTORY = 'browsingCheckboxBasic';

/**
 * Query selector for shadow DOM: checkbox for clear cache
 * @type {String}
 */
const CACHE = 'cacheCheckboxBasic';

/**
 * Query selector function
 * @param  {string} selector
 * @return {HTMLElement}
 */
const find = selector => document.querySelector(selector);

function click(type, selector) {
	/**
	 * Find first element from a collection by tag name
	 * @param  {DOMCollection} collection
	 * @param  {String}        name       uppercase tag name
	 * @return {DOMElement}
	 */
	const findTag = (collection, name) => [ ...collection ].find(i => i.tagName && i.tagName.toUpperCase() === name);

	/**
	 * Find UI "slot"
	 * @param  {String} name
	 * @return {DOMElement}
	 */
	function getSlot(name) {
		const main = document.querySelector('settings-ui').shadowRoot.children.container.children.main;
		const settings = findTag(main.shadowRoot.children, 'SETTINGS-BASIC-PAGE');
		const basicPage = settings.shadowRoot.children.basicPage;
		const advancedPage = settings.shadowRoot.children.advancedPage;
		const [ page ] = [ ...basicPage.children, ...advancedPage.children ].find(i => i.section === 'privacy').children;
		const dialog = findTag(page.shadowRoot.children, 'SETTINGS-CLEAR-BROWSING-DATA-DIALOG');

		return dialog.shadowRoot.children.clearBrowsingDataDialog.querySelector(`[slot="${name}"]`);
	}

	function checkbox() {
		const container = getSlot('body').children.tabs.children['basic-tab'].children[selector];
		const row = findTag(container.shadowRoot.children, 'DIV');

		row.children.checkbox.shadowRoot.children.checkbox.click();
	}

	const button = () => getSlot('button-container').children.clearBrowsingDataConfirm.click();

	try {
		switch (type) {
			case 'checkbox':
				checkbox();
				break;
			case 'button':
			default:
				button();
				break;
		}
	} catch (error) {
		error.message = `Could not locate ${type} ${selector}.\n ${error.message}`;
		throw error;
	}
}

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
module.exports = async function clearCache(
	{ webdriver, driver },
	{ cookies = false, cache = true, history = true } = {},
) {
	if (!(cookies || cache || history)) {
		return;
	}

	const { By, until } = webdriver;

	await driver.get(PAGE);

	await driver.wait(
		until.elementLocated(
			By.js(find, 'settings-ui'),
		),
		3000,
	);

	await driver.sleep(400);

	await Promise.all(
		[
			[ cookies, COOKIES ],
			[ cache, CACHE ],
			[ history, HISTORY ],
		].map(
			async ([ option, query ]) => option || driver.executeScript(
				click,
				'checkbox',
				query,
			),
		),
	);

	driver.executeScript(
		click,
		'button',
	);

	await driver.sleep(400);
};
