const config = require('./config');
const until = require('protractor').ExpectedConditions;
// const { expect } = require('chai');
// const moment = require('moment');

exports.findExams = async () => {
  const exams = element.all(by.css('div[data-testid^="exam-root"]'));
  await browser.wait(until.presenceOf(exams), config.waitTime, 'Cannot find exams in the page.');

  return exams;
};

exports.findExam = async (title) => {
  const exams = await exports.findExams();
  const examsWithTitle = await Promise.all(exams.map(async (exam, idx) => {
    const examTitleElement = exam.element(by.css('[data-testid=\'title\']'));
    await browser.wait(until.presenceOf(examTitleElement), config.waitTime, `Cannot find exam ${idx} title.`);

    const thisExamTitle = await examTitleElement.getText();
    if (thisExamTitle === title) {
      return idx;
    }
    return null;
  }));


  const examIndex = examsWithTitle.find(idx => typeof idx === 'number');
  const exam = exams[examIndex];
  return exam;
};
