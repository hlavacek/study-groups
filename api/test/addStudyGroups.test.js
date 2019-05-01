const { expect } = require('chai');
const httpStatus = require('http-status');
const { addStudyGroup } = require('../src/handler');
const { getExam } = require('../src/db');

describe('addStudyGroups', () => {
  const studyGroup = {
    location: 'New Location',
    datetime: '13.2.2019, 11:00',
  };

  const callAddStudyGroup = async (examId, testStudyGroup, expectedStatus = httpStatus.OK) => {
    const event = {
      body: JSON.stringify(testStudyGroup),
      pathParameters: {
        examId
      },
    };
    const response = await addStudyGroup(event);

    expect(response.statusCode).to.equal(expectedStatus);
    return response;
  };

  it('should add study groups into the list of existing study groups', async () => {
    await callAddStudyGroup(1, studyGroup);

    const exam = await getExam(1);

    expect(exam.studyGroups).to.have.length(3);
    expect(exam.studyGroups[2].location).to.equal(studyGroup.location);
    expect(exam.studyGroups[2].datetime).to.equal(studyGroup.datetime);
    expect(exam.studyGroups[2].id).to.equal('3');
  });

  it('should add study groups if there are no study groups', async () => {
    await callAddStudyGroup(2, studyGroup);

    const exam = await getExam(2);

    expect(exam.studyGroups).to.have.length(1);
    expect(exam.studyGroups[0].location).to.equal(studyGroup.location);
    expect(exam.studyGroups[0].datetime).to.equal(studyGroup.datetime);
    expect(exam.studyGroups[0].id).to.equal('1');
  });

  it('should return cors headers', async () => {
    const response = await callAddStudyGroup(2, studyGroup);
    expect(response.headers['Access-Control-Allow-Origin']).to.equal('*');
    expect(response.headers['Access-Control-Allow-Credentials']).to.equal(true);
  });
});
