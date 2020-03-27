const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const companyName = 'Integration Test';
const incidentTitle = 'Test Incident';

describe('Incident', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });
  it('should be able to create a new INCIDENT', async () => {
    await createNewCompany();
    const company = await GetListOfCompany();
    const responseIncident = await createIncident(company.body[0].Id);
    expect(responseIncident.status).toBe(200);
  });

  it('should be able to retrieve the list of INCIDENT', async () => {
    await createNewCompany();
    const company = await GetListOfCompany();
    await createIncident(company.body[0].Id);
    const response = await GetListOfIncident();
    expect(response.body[0]).toHaveProperty('Id');
    expect(response.body[0].Title).toBe(incidentTitle);
  });

  it('should be able to delete INCIDENT', async () => {
    await createNewCompany();
    const company = await GetListOfCompany();
    await createIncident(company.body[0].Id);
    const incident = await GetListOfIncident();
    console.log(company.body[0].Id);
    console.log(incident.body[0]);
    const response = await DeleteIncident(company.body[0].Id, incident.body[0].Id);
    expect(response.status).toBe(204);
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

async function createIncident(companyId) {
  return await request(app)
    .post('/incident')
    .set({ Authorization: `${companyId}` })
    .send({
      title: incidentTitle,
      description: 'details of the case',
      value: 120
    });
}

async function GetListOfCompany() {
  return await request(app)
    .get('/company')
    .send();
}

async function GetListOfIncident() {
  return await request(app)
    .get('/incident')
    .send();
}

async function DeleteIncident(companyId, incidentId) {
  return await request(app)
    .delete(`/incident/${incidentId}`)
    .set({ Authorization: `${companyId}` })
    .send();
}
