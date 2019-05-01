const config = require('./config');
const until = require('protractor').ExpectedConditions;
const { expect } = require('chai');
// const moment = require('moment');
const { Then } = require('cucumber');
const { findExams, findExam } = require('./common');

Then('I will see header {string}', async (header) => {
  const headerElement = element(by.xpath(`//h6[text()='${header}']`));
  await browser.wait(until.presenceOf(headerElement), config.waitTime, `Cannot find  header with title ${header}.`);
});


const validateTestElements = (inElement, { expectedData, keyNotFound, notEqualValue }) =>
  Promise.all(Object.entries(expectedData).map(async ([key, expectedValue]) => {
    const elementWithKey = inElement.element(by.css(`[data-testid='${key}']`));
    await browser.wait(until.presenceOf(elementWithKey), config.waitTime, keyNotFound(key));

    const elementText = await elementWithKey.getText();
    expect(elementText, notEqualValue(key)).to.equal(expectedValue);
  }));

Then('I will see exams', async (dataTable) => {
  const exams = await findExams();

  // first just validate the counts
  const examsCount = exams.length;
  expect(examsCount, 'The found exams length is not the same as expected.')
    // one less, as we have header row
    .to.equal(dataTable.hashes().length);

  await Promise.all(exams.map(async (exam, idx) => {
    const expectedData = dataTable.hashes()[idx];

    await validateTestElements(exam, {
      expectedData,
      keyNotFound: key => `Cannot find element ${key} for exam with index ${idx}.`,
      notEqualValue: key => `The exam element ${key} for exam with index ${idx} does not have expected value`,
    });
  }));
});


Then('Exam {string} will have study groups', async (examTitle, dataTable) => {
  const exam = await findExam(examTitle);

  const studyGroups = exam.all(by.css('[data-testid^=\'studyGroup\']'));
  if (dataTable.hashes().length > 0) {
    await browser.wait(until.presenceOf(studyGroups), config.waitTime, `Cannot study groups for exam ${examTitle}`);
  }

  await Promise.all([studyGroups.map(async (studyGroup, idx) => {
    const expectedData = dataTable.hashes()[idx];

    await validateTestElements(studyGroup, {
      expectedData,
      keyNotFound: key => `Cannot find ${key} for studyGroup ${idx} of exam ${examTitle}`,
      notEqualValue: key => `The ${key} for studyGroup ${idx} of exam ${examTitle} does not have the expected value.`,
    });
  })]);
});
