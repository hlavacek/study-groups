const {
  BeforeAll, After, AfterAll, setDefaultTimeout
} = require('cucumber');
const config = require('./config');
const { resetDatabase } = require('./db');

setDefaultTimeout(40 * 1000);

BeforeAll(async () => { // eslint-disable-line new-cap
  console.log(`Test configuration: ${JSON.stringify(config)}`); // eslint-disable-line no-console
  // disable angular support
  browser.ignoreSynchronization = true;
  await resetDatabase();
});

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
});

// eslint-disable-next-line new-cap
AfterAll(async () => {
  await browser.close();
});
