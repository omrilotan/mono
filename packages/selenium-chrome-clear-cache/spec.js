const webdriver = require("selenium-webdriver");

const { Builder } = webdriver;
const clearCache = require(".");

const TIMEOUT = 30 * 1e3;
const RETRIES = process.env.CI ? 2 : 1;
const TIMES = process.env.CI ? 3 : 1;

const LINK =
	"https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching";
const MEASURE =
	"return performance.timing.loadEventEnd - performance.timing.navigationStart;";

describe("selenium-chrome-clear-cache", async () => {
	let driver;

	beforeEach(async () => {
		driver = await new Builder().forBrowser("chrome").build();
	});

	afterEach(async () => {
		try {
			await driver.quit();
		} catch (error) {
			console.error(error); // eslint-disable-line no-console
		}

		await wait(1000);
	});

	let i = TIMES;
	while (i--) {
		it(`Load times should decrease with cache and increase after clearing it (${3 -
			i}/3)`, async () => {
			const loadTimes = [];

			await driver.get(`${LINK}?${i}`);
			loadTimes.push(await driver.executeScript(MEASURE));

			await driver.get(`${LINK}?${i}`);
			loadTimes.push(await driver.executeScript(MEASURE));

			await clearCache({ webdriver, driver });

			await driver.get(`${LINK}?${i}`);
			loadTimes.push(await driver.executeScript(MEASURE));

			expect(loadTimes[1]).to.be.below(loadTimes[0]);
			expect(loadTimes[2]).not.to.be.below(loadTimes[1]);
		})
			.timeout(TIMEOUT)
			.retries(RETRIES);

		it(`Load times should	decrease with cache and stay low after de-selecting history and cache (${3 -
			i}/3)`, async () => {
			const loadTimes = [];

			await driver.get(`${LINK}?${i}`);
			loadTimes.push(await driver.executeScript(MEASURE));

			await driver.get(`${LINK}?${i}`);
			loadTimes.push(await driver.executeScript(MEASURE));

			await clearCache(
				{ webdriver, driver },
				{ cache: false, history: false, cookies: true }
			);

			await driver.get(`${LINK}?${i}`);
			loadTimes.push(await driver.executeScript(MEASURE));

			expect(loadTimes[1]).to.be.below(loadTimes[0]);
			expect(loadTimes[2]).to.be.below(loadTimes[0]);
			expect(Math.abs(loadTimes[2] - loadTimes[1])).to.be.below(
				Math.abs(loadTimes[2] - loadTimes[0])
			);
		})
			.timeout(TIMEOUT)
			.retries(RETRIES);
	}

	it("Should not try to click the disabled button when no checkboxes are marked", async () => {
		try {
			await clearCache({ webdriver, driver }, { cache: false, history: false });
		} catch (error) {
			throw error;
		}
	});
});
