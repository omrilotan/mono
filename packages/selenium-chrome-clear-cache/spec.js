const webdriver = require('selenium-webdriver');
const {Builder} = webdriver;
const clearCache = require('.');

const TIMEOUT = 30 * 1e3;
const HOOK_TIMEOUT = 10 * 1e3;

const LINK = 'https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching';
const MEASURE = 'return performance.timing.loadEventEnd - performance.timing.navigationStart;';

describe('selenium-chrome-clear-cache', async() => {
    let driver;

    beforeEach(async() => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async() => {
        await driver.quit();
        await sleep(1000);
    });

    let i = 3;
    while (i--) {
        it(`Load times should decrease with cache and increase after clearing it (${3 - i}/3)`, async() => {
            const loadTimes = [];

            await driver.get(`${LINK}?${i}`);
            loadTimes.push(await driver.executeScript(MEASURE));

            await driver.get(`${LINK}?${i}`);
            loadTimes.push(await driver.executeScript(MEASURE));

            await clearCache({webdriver, driver});

            await driver.get(`${LINK}?${i}`);
            loadTimes.push(await driver.executeScript(MEASURE));

            expect(loadTimes[1]).to.be.below(loadTimes[0]);
            expect(loadTimes[2]).not.to.be.below(loadTimes[1]);
        }).timeout(TIMEOUT).retries(2);

        it(`Load times should  decrease with cache and stay low after de-selecting all checkboxes (${3 - i}/3)`, async() => {
            const loadTimes = [];

            await driver.get(`${LINK}?${i}`);
            loadTimes.push(await driver.executeScript(MEASURE));

            await driver.get(`${LINK}?${i}`);
            loadTimes.push(await driver.executeScript(MEASURE));

            await clearCache({webdriver, driver}, {cache: false, history: false});

            await driver.get(`${LINK}?${i}`);
            loadTimes.push(await driver.executeScript(MEASURE));

            expect(loadTimes[1]).to.be.below(loadTimes[0]);
            expect(loadTimes[2]).not.to.be.below(loadTimes[1]);
        }).timeout(TIMEOUT).retries(2);
    }
});
