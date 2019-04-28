const { expect } = require('chai');
const { getExams } = require('../src/handler');
const exams = require('./testData');

describe("getExams", () => {
  it("should get exams", async () => {
    const exams = await getExams();
    expect(exams).to.eql(exams);
  });
});