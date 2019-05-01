// require('dotenv-safe').config();

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';


module.exports = {
  baseUrl,
  waitTime: 1 * 1000,
  asyncTimeout: 1 * 1000,
  dynamoTable: process.env.DYNAMO_TABLE || 'sg-exams-dev',
};
