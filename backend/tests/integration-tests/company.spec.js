const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const companyName = 'Integration Test';

describe('Company', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });
  it('should be able to create a new COMPANY', async () => {
    const response = await createNewCompany();
    expect(response.body).toHaveProperty('code');
    expect(response.body.code).toHaveLength(8);
  });

  it('should be able to retrieve the list of COMPANY', async () => {
    await createNewCompany();
    const response = await GetListOfCompany();
    expect(response.body[0]).toHaveProperty('Id');
    expect(response.body[0].Code).toHaveLength(8);
    expect(response.body[0].Name).toBe(companyName);
  });
});

async function createNewCompany() {
  return await request(app)
    .post('/company')
    .send({
      name: companyName,
      email: 'integrationtest@test.com',
      whatsapp: '41999999999',
      city: 'Test City',
      state: 'TS'
    });
}

async function GetListOfCompany() {
  return await request(app)
    .get('/company')
    .send();
}
