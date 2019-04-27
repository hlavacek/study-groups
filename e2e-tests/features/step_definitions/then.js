const config = require('./config');
const until = require('protractor').ExpectedConditions;
// const { expect } = require('chai');
// const moment = require('moment');
const { Then } = require('cucumber');


Then('I will see header {string}', async (header) => {
  const headerElement = element(by.xpath(`//header[text()='${header}']`));
  await browser.wait(until.presenceOf(headerElement), config.waitTime, `Cannot find  header with title ${header}.`);
});
