'use strict';
const httpStatus = require('http-status');
const { documentClient, getExam, putExam } = require('./db');
const config = require('./config');

module.exports.getExams = async (event) => {
  const dbResponse = await documentClient.scan({ TableName: config.dynamoTable }).promise();
  
  return {
    statusCode: httpStatus.OK,
    body: JSON.stringify(dbResponse.Items),
  };
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
  
  return {
    statusCode: httpStatus.OK,
    body: "",
  };
};

module.exports.addStudyGroupStudent = async (event) => {
  const student = JSON.parse(event.body);
  const { examId, studyGroupId } = event.pathParameters;

  const existingExam = await getExam(examId);
  const studyGroup = existingExam.studyGroups.find((studyGroup) => studyGroup.id === String(studyGroupId));

  if (!studyGroup.students) {
    studyGroup.students = [];
  }
  studyGroup.students.push(student.name);

  await putExam(existingExam);

  return {
    statusCode: httpStatus.OK,
    body: "",
  };
}