const config = require('./config');
// const until = require('protractor').ExpectedConditions;
const { When } = require('cucumber');

When(
  'I go to {string}',
  stringInDoubleQuotes =>
    browser.get(`${config.baseUrl}${stringInDoubleQuotes}`)
);

