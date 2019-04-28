const AWS = require('aws-sdk');
const config = require('./config');

const dynamoOptions = {};

if (process.env.NODE_ENV === 'test') {
  dynamoOptions.endpoint = new AWS.Endpoint(config.dynamoTestEndpoint);
}

const documentClient = new AWS.DynamoDB.DocumentClient(dynamoOptions);

module.exports = {
  db: new AWS.DynamoDB(dynamoOptions),
  documentClient,
  getExam: async (examId) => {
    const params = {
      TableName: config.dynamoTable,
      Key: { "id": String(examId) }
    };
    const result = await documentClient.get(params).promise();
    return result.Item;
  },

  putExam: async (exam) => {
    const putParams = {
      TableName: config.dynamoTable,
      Item: exam,
    }
  
    await documentClient.put(putParams).promise();
  }
};
