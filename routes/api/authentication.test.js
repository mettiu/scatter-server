const request = require('supertest');
const app = require('../../app');
const dbUtils = require('../../utils/db-utils');
const dbSetup = require('../../utils/db-setup');

let connection;

describe('Testing http Authentication', () => {
  beforeAll(async () => {
    connection = await dbUtils.dbConnect();
    const inserted = await dbSetup.setupUsers(connection);
    expect(Array.isArray(inserted)).toBeTruthy();
  });

  afterAll(async () => {
    await dbUtils.dbCloseConnection(connection);
  });

  it('should authenticate', async () => {
    const response = await request(app).post('/api/authentication/login').send({
      email: 'mettiu@gmail.com',
      password: 'mettiu',
    });
    expect(response.statusCode).toBe(200);
  });

  it('should not authenticate (wrong password)', async () => {
    const response = await request(app).post('/api/authentication/login').send({
      email: 'mettiu@gmail.com',
      password: 'wrong-password',
    });
    expect(response.statusCode).toBe(401);
  });

  it('should not authenticate (unexistent user)', async () => {
    const response = await request(app).post('/api/authentication/login').send({
      email: 'wrong.email@gmail.com',
      password: 'mettiu',
    });
    expect(response.statusCode).toBe(401);
  });
});
