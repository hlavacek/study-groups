const { db, documentClient } = require('../src/db');
const config = require('../src/config');
const exams = require('./testData');

before(async () => {
  // we need to create table and insert data
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: config.dynamoTable
  };
  try {
    await db.createTable(params).promise();
  } catch (err) {
    // console.debug('table already exists');
  }
});

beforeEach(async () => {
  await documentClient.put({
    TableName: config.dynamoTable,
    Item: exams[0],
  }).promise();
  await documentClient.put({
    TableName: config.dynamoTable,
    Item: exams[1],
  }).promise();
});
