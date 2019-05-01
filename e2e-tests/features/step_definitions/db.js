const AWS = require('aws-sdk');
const config = require('./config');
const exams = require('./testData');

const dynamoOptions = {};

const documentClient = new AWS.DynamoDB.DocumentClient(dynamoOptions);

exports.putExam = async (exam) => {
  const putParams = {
    TableName: config.dynamoTable,
    Item: exam,
  };

  await documentClient.put(putParams).promise();
};

exports.resetDatabase = async () => {
  await Promise.all(exams.map(exam => exports.putExam(exam)));
};
