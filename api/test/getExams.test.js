const { expect } = require('chai');
const { getExams } = require('../src/handler');
const exams = require('./testData');

describe('getExams', () => {
  it('should get exams', async () => {
    const response = await getExams();
    expect(exams).to.eql(JSON.parse(response.body));
  });

  it('should return cors headers', async () => {
    const response = await getExams();
    expect(response.headers['Access-Control-Allow-Origin']).to.equal('*');
    expect(response.headers['Access-Control-Allow-Credentials']).to.equal(true);
  });
});
