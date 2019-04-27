const {
  BeforeAll, After, AfterAll, setDefaultTimeout
} = require('cucumber');
const config = require('./config');

setDefaultTimeout(40 * 1000);

const logout = async () => {
  await browser.executeScript('window.localStorage.clear();');
  await browser.executeScript('window.sessionStorage.clear();');
  await browser.driver.manage().deleteAllCookies();
};

BeforeAll(async () => { // eslint-disable-line new-cap
  console.log(`Test configuration: ${JSON.stringify(config)}`); // eslint-disable-line no-console
  // disable angular support
  browser.ignoreSynchronization = true;
});

After(async function after() {
  const world = this;

  const png = await browser.takeScreenshot();

  const buffer = Buffer.from(png, 'base64');
  await world.attach(buffer, 'image/png');

  // logout and clear data
  await logout();
});

// eslint-disable-next-line new-cap
AfterAll(async () => {
  await browser.close();
});
