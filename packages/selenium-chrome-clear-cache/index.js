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
const find = selector => document.querySelector(selector)

/**
 * Toggle a shadow checkbox
 * @param  {string} selector (browsingCheckbox, cookiesCheckbox, cacheCheckbox)
 * no return value
 */
function toggleCheckbox(selector) {
	try {
		const main = document.querySelector('settings-ui').shadowRoot.children.container.children.main;
		const settings = [...main.shadowRoot.children].find(i => i.tagName && i.tagName.toUpperCase() === 'SETTINGS-BASIC-PAGE');
		const advancedPage = settings.shadowRoot.children.advancedPage;
		const privacy = [...advancedPage.children].find(i => i.section === 'privacy');
		const [page] = privacy.children;
		const dialog = [...page.shadowRoot.children].find(i => i.tagName && i.tagName.toUpperCase() === 'SETTINGS-CLEAR-BROWSING-DATA-DIALOG');
		const body = dialog.shadowRoot.children.clearBrowsingDataDialog.querySelector('[slot="body"]');
		const tab = body.children.tabs.children['basic-tab'];

		const container = tab.children[selector];
		const row = [...container.shadowRoot.children].find(i => i.tagName && i.tagName.toUpperCase() === 'DIV');

		row.children.checkbox.shadowRoot.children.checkbox.click();
	} catch (error) {
		error.message = `Could not locate checkbox for ${selector}.\n ${error.message}`;
		throw error;
	}
}

/**
 * Toggle the submit button
 * no return value
 */
function submit() {
	try {
		const main = document.querySelector('settings-ui').shadowRoot.children.container.children.main;
		const settings = [...main.shadowRoot.children].find(i => i.tagName && i.tagName.toUpperCase() === 'SETTINGS-BASIC-PAGE');
		const advancedPage = settings.shadowRoot.children.advancedPage;
		const privacy = [...advancedPage.children].find(i => i.section === 'privacy');
		const [page] = privacy.children;
		const dialog = [...page.shadowRoot.children].find(i => i.tagName && i.tagName.toUpperCase() === 'SETTINGS-CLEAR-BROWSING-DATA-DIALOG');
		const container = dialog.shadowRoot.children.clearBrowsingDataDialog.querySelector('[slot="button-container"]');

		container.children.clearBrowsingDataConfirm.click();
	} catch (error) {
		error.message = `Could not locate submit button.\n ${error.message}`;
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
module.exports = async function clearCache({webdriver, driver}, {cookies = false, cache = true, history = true} = {}) {
	if (!(cookies || cache || history)) {
		return;
	}

	const { By, until } = webdriver;

	await driver.get(PAGE);

	await driver.wait(
		until.elementLocated(
			By.js(find, 'settings-ui')
		),
		3000
	);

	await driver.sleep(400);

	await Promise.all(
		[
			[cookies, COOKIES],
			[cache, CACHE],
			[history, HISTORY],
		].map(
			async ([option, query]) => option || driver.executeScript(
				toggleCheckbox,
				query
			)
		)
	);

	driver.executeScript(
		submit
	);

	await driver.sleep(400);
};
