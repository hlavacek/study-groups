const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  DYNAMO_TABLE_NAME: Joi.string().default('sg-exams-dev'),
  DYNAMO_TEST_ENDPOINT: Joi.string().default('http://localhost:8000'),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  dynamoTable: envVars.DYNAMO_TABLE_NAME,
  dynamoTestEndpoint: envVars.DYNAMO_TEST_ENDPOINT
};

module.exports = config;
