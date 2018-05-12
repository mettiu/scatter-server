const fetch = require('node-fetch');
const dbUtils = require('../../utils/db-utils');
const dbSetup = require('../../utils/db-setup');
const wwwUtils = require('../../utils/www-utils');
const jwt = require('jsonwebtoken');

let connection;
let process = null;

describe('Testing http Authentication', () => {
  beforeAll(async () => {
    connection = await dbUtils.dbConnect();
    const inserted = await dbSetup.setupUsers(connection);
    expect(Array.isArray(inserted)).toBeTruthy();
    process = await wwwUtils.forkServer();
  });

  afterAll(async () => {
    await dbUtils.dbCloseConnection(connection);
    wwwUtils.killServer(process);
  });

  it('should authenticate', async () => {
    const res = await fetch(
      'http://localhost:3000/api/authentication/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'mettiu@gmail.com',
          password: 'mettiu',
        }),
      },
    );
    const json = await res.json();
    expect(json).toHaveProperty('email', 'mettiu@gmail.com');
    expect(json).toHaveProperty('firstName', 'Matteo');
    expect(json).toHaveProperty('lastName', 'Tamburini');
    expect(json).toHaveProperty('jwt');

    let decoded;
    try {
      decoded = await jwt.verify(json.jwt, 'secret');
    } catch (e) {
      console.log('ERROR, token is not valid', e);
    }
    expect(decoded).toEqual(expect.anything());
  });

  it('should not authenticate (wrong password)', async () => {
    const res = await fetch(
      'http://localhost:3000/api/authentication/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'mettiu@gmail.com',
          password: 'wrong-password',
        }),
      },
    );
    expect(res.status).toBe(401);
  });

  it('should not authenticate (unexistent user)', async () => {
    const res = await fetch(
      'http://localhost:3000/api/authentication/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'wrong.email@gmail.com',
          password: 'mettiu',
        }),
      },
    );
    expect(res.status).toBe(401);
  });
});
