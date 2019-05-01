const AWS = require('aws-sdk');
const config = require('./config');

const dynamoOptions = {};

const documentClient = new AWS.DynamoDB.DocumentClient(dynamoOptions);

exports.putExam = async (exam) => {
  const putParams = {
    TableName: config.dynamoTable,
    Item: exam,
  };

  await documentClient.put(putParams).promise();
};
