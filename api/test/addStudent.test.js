const { expect } = require('chai');
const httpStatus = require('http-status');
const { addStudyGroupStudent } = require('../src/handler');
const { getExam } = require('../src/db');
const config = require('../src/config');

describe("addStudent", () => {
  const student = {
    name: "Vladimir Hlavacek"
  };
  
  const callAddStudent = async (examId, studyGroupId, student, expectedStatus = httpStatus.OK) => {
    const event = {
      body: JSON.stringify(student),
      pathParameters: {
        examId,
        studyGroupId
      },
    };
    const response = await addStudyGroupStudent(event);

    expect(response.statusCode).to.equal(expectedStatus);
  }

  it("should add student into a study groups to existing students", async () => {
    await callAddStudent(1, 1, student);

    const exam = await getExam(1);
    expect(exam.studyGroups[0].students).to.contain(student.name);
  });

  it("should add student into a study group, when no students", async () => {
    await callAddStudent(1, 2, student);

    const exam = await getExam(1);
    expect(exam.studyGroups[1].students).to.contain(student.name);
  });

});