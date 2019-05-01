const config = require('./config');
const until = require('protractor').ExpectedConditions;
const { When } = require('cucumber');
const { findExam } = require('./common');
// const { expect } = require('chai');

When(
  'I go to {string}',
  stringInDoubleQuotes =>
    browser.get(`${config.baseUrl}${stringInDoubleQuotes}`)
);

When('I expand exam {string}', async (examTitle) => {
  const exam = await findExam(examTitle);
  const expandButton = exam.element(by.css('[data-testid=\'expand\']'));
  await browser.wait(until.presenceOf(expandButton), config.waitTime, `Cannot find expand button for exam ${examTitle}.`);

  await expandButton.click();
});

When('I set {string} to {string} in exam {string}', async (field, value, examTitle) => {
  const exam = await findExam(examTitle);

  const inputElement = exam.element(by.css(`input[placeholder='${field}'`));
  await browser.wait(until.presenceOf(inputElement), config.waitTime, `Cannot find input ${field} for exam ${examTitle}.`);

  await inputElement.clear();
  await inputElement.sendKeys(value);
});

When('I click on button {string} in exam {string}', async (buttonLabel, examTitle) => {
  const exam = await findExam(examTitle);

  const button = exam.element(by.css(`button[aria-label='${buttonLabel}'`));
  await browser.wait(until.presenceOf(button), config.waitTime, `Cannot find button ${buttonLabel} for exam ${examTitle}.`);

  await button.click();
});
