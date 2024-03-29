const httpStatus = require('http-status');
const { documentClient, getExam, putExam } = require('./db');
const config = require('./config');

const addCorsHeaders = (response) => {
  response.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };
  return response;
};

module.exports.getExams = async () => {
  const dbResponse = await documentClient.scan({ TableName: config.dynamoTable }).promise();

  return addCorsHeaders({
    statusCode: httpStatus.OK,
    body: JSON.stringify(dbResponse.Items),
  });
};

module.exports.addStudyGroup = async (event) => {
  const studyGroup = JSON.parse(event.body);
  const { examId } = event.pathParameters;

  const existingExam = await getExam(examId);
  if (!existingExam.studyGroups) {
    existingExam.studyGroups = [];
  }
  existingExam.studyGroups.push(studyGroup);
  studyGroup.id = String(existingExam.studyGroups.length);

  await putExam(existingExam);

  return addCorsHeaders({
    statusCode: httpStatus.OK,
    body: '',
  });
};

module.exports.addStudyGroupStudent = async (event) => {
  const student = JSON.parse(event.body);
  const { examId, studyGroupId } = event.pathParameters;

  const existingExam = await getExam(examId);
  const studyGroup = existingExam.studyGroups
    .find(sg => sg.id === String(studyGroupId));

  if (!studyGroup.students) {
    studyGroup.students = [];
  }
  studyGroup.students.push(student.name);

  await putExam(existingExam);

  return addCorsHeaders({
    statusCode: httpStatus.OK,
    body: '',
  });
};
