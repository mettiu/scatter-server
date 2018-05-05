const loginFactory = require('./login-factory');

describe('login', () => {
  let deps;
  let login;
  let fakeOkRequire;
  let fakeKoRequire;
  const fakeUser = {
    _id: '5a3507457db4e6110651379b',
    salt: 'dcf9c4b8f14cfee4912d960a222ecca12dbdc30d9362adfc90e36731c86ed19e',
    hash: '85e3d8566d9237873d6bbebbdd6602b57e95af317a54d3ac0e2658a1a1ee8cd197bd174a1640e3fdfc2f421d90ecf9ebed94a0fb59e9f5b53581571d06c93b167c68517794275519cd69931b8cd11fa382014eee0f8e2ff98726489a8e41ed92c57a3dae51f0d741fa74952dd8351960c45899073f3754f410f5d4c148c6927ffc61e5ce4b2e7f36bf3efcda35a8f9b459f3390a06f8ffa146eef9fe7beae02c87a0a462485fccea575ae48b86cba7d8814970e8dce8add24a893b18f43378a7270d73620a65e3264aa67763f9a348fa7f83d55c47c3f858bd897188754431b85d1a8e4bc328975049246e77ef146845aa3956d36017a7a0afe64da92cda92c29bf571578fcb5ee159af4935198c1d3e820675fbb6bb09f35a718c4a76b8708191878211f4ec2fc50705886377876ad3413b6e88160106501dcc07a9c918f742919e1ec7b5f44313091628959e7cf7f19511224eee13c8d746f0a1a452cca18d8a721e100068bafa975e1b4d10a0a17ca0a92d92cfda57dd981167f236dd5bb8e95543cdfa75237d050b9383b9325843b821979802d29bba62aa1966cf5416e16f48fd6af07bc8618cbedb22a6a985b6d82d7ae7e08003881106193eb113b65ad79eda417dcf0e9b0b2ea65dc6920d7d889743e0bf5d0e46548424182b1f4d2c9886e18f5a6a278ce1ec06f0bc2ae96b4969a9de50a59442aec0818be38447ae',
    username: 'mettiu',
    firstName: 'Matteo',
    lastName: 'Tamburini',
    email: 'mettiu@gmail.com',
    __v: 49,
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGJ1bXMiOlsyMzc1OSwyMzcwNyw2NTAzNiw1MDY4ODhdLCJhcnRpc3RzIjpbMTAzNjg3LDEzMDE4NSwzMTQ3MzUsNjUyMCw4MTQyLDYyODUyOCwxNjIwNDMxLDQ1MDIyNCw1Nzk1NzUsMjUzMDg2MSw5MzM1NjksMzM3OTY0LDU4MTQ1OV0sIl9pZCI6IjVhMzUwNzQ1N2RiNGU2MTEwNjUxMzc5YiIsInNhbHQiOiJkY2Y5YzRiOGYxNGNmZWU0OTEyZDk2MGEyMjJlY2NhMTJkYmRjMzBkOTM2MmFkZmM5MGUzNjczMWM4NmVkMTllIiwiaGFzaCI6Ijg1ZTNkODU2NmQ5MjM3ODczZDZiYmViYmRkNjYwMmI1N2U5NWFmMzE3YTU0ZDNhYzBlMjY1OGExYTFlZThjZDE5N2JkMTc0YTE2NDBlM2ZkZmMyZjQyMWQ5MGVjZjllYmVkOTRhMGZiNTllOWY1YjUzNTgxNTcxZDA2YzkzYjE2N2M2ODUxNzc5NDI3NTUxOWNkNjk5MzFiOGNkMTFmYTM4MjAxNGVlZTBmOGUyZmY5ODcyNjQ4OWE4ZTQxZWQ5MmM1N2EzZGFlNTFmMGQ3NDFmYTc0OTUyZGQ4MzUxOTYwYzQ1ODk5MDczZjM3NTRmNDEwZjVkNGMxNDhjNjkyN2ZmYzYxZTVjZTRiMmU3ZjM2YmYzZWZjZGEzNWE4ZjliNDU5ZjMzOTBhMDZmOGZmYTE0NmVlZjlmZTdiZWFlMDJjODdhMGE0NjI0ODVmY2NlYTU3NWFlNDhiODZjYmE3ZDg4MTQ5NzBlOGRjZThhZGQyNGE4OTNiMThmNDMzNzhhNzI3MGQ3MzYyMGE2NWUzMjY0YWE2Nzc2M2Y5YTM0OGZhN2Y4M2Q1NWM0N2MzZjg1OGJkODk3MTg4NzU0NDMxYjg1ZDFhOGU0YmMzMjg5NzUwNDkyNDZlNzdlZjE0Njg0NWFhMzk1NmQzNjAxN2E3YTBhZmU2NGRhOTJjZGE5MmMyOWJmNTcxNTc4ZmNiNWVlMTU5YWY0OTM1MTk4YzFkM2U4MjA2NzVmYmI2YmIwOWYzNWE3MThjNGE3NmI4NzA4MTkxODc4MjExZjRlYzJmYzUwNzA1ODg2Mzc3ODc2YWQzNDEzYjZlODgxNjAxMDY1MDFkY2MwN2E5YzkxOGY3NDI5MTllMWVjN2I1ZjQ0MzEzMDkxNjI4OTU5ZTdjZjdmMTk1MTEyMjRlZWUxM2M4ZDc0NmYwYTFhNDUyY2NhMThkOGE3MjFlMTAwMDY4YmFmYTk3NWUxYjRkMTBhMGExN2NhMGE5MmQ5MmNmZGE1N2RkOTgxMTY3ZjIzNmRkNWJiOGU5NTU0M2NkZmE3NTIzN2QwNTBiOTM4M2I5MzI1ODQzYjgyMTk3OTgwMmQyOWJiYTYyYWExOTY2Y2Y1NDE2ZTE2ZjQ4ZmQ2YWYwN2JjODYxOGNiZWRiMjJhNmE5ODViNmQ4MmQ3YWU3ZTA4MDAzODgxMTA2MTkzZWIxMTNiNjVhZDc5ZWRhNDE3ZGNmMGU5YjBiMmVhNjVkYzY5MjBkN2Q4ODk3NDNlMGJmNWQwZTQ2NTQ4NDI0MTgyYjFmNGQyYzk4ODZlMThmNWE2YTI3OGNlMWVjMDZmMGJjMmFlOTZiNDk2OWE5ZGU1MGE1OTQ0MmFlYzA4MThiZTM4NDQ3YWUiLCJ1c2VybmFtZSI6Im1ldHRpdSIsImZpcnN0TmFtZSI6Ik1hdHRlbyIsImxhc3ROYW1lIjoiVGFtYnVyaW5pIiwiZW1haWwiOiJtZXR0aXVAZ21haWwuY29tIiwiX192Ijo0OSwiaWF0IjoxNTI1NDc1ODMxfQ.ip65_ZV7_QJjCQCCUhvZmTH_3DgD5RyPHG9sRpCe51Q',
  };
  const fake400 = {
    name: 'StatusCodeError',
    statusCode: 400,
    message: '400 - "Bad Request"',
    error: 'Bad Request',
  };

  beforeEach(() => {
    fakeOkRequire = jest.fn()
      .mockReturnValue(new Promise((resolve) => {
        resolve(fakeUser);
      }));

    fakeKoRequire = jest.fn()
      .mockReturnValue(new Promise((resolve, reject) => {
        reject(fake400);
      }));

    deps = {
      uri: 'FakeURI',
      // request: fakeOkRequire,
    };
    login = loginFactory(deps);
  });

  describe('happy and successful', () => {
    beforeEach(() => {
      deps.request = fakeOkRequire;
    });

    it('Should find the user', async () => {
      let err;
      let result;

      try {
        result = await login('test@example.com', 'test-undisclosed-password :-)');
      } catch (e) {
        err = e;
      }
      expect(err).toBeUndefined();
      expect(result).toEqual(fakeUser);
      expect(fakeOkRequire).toBeCalledWith({
        method: 'POST',
        uri: 'FakeURI',
        body: {
          email: 'test@example.com',
          password: 'test-undisclosed-password :-)',
        },
        json: true,
      });
    });
  });

  describe('sad and unsuccessful', () => {
    beforeEach(() => {
      deps.request = fakeKoRequire;
    });

    it('Should NOT find the user', async () => {
      let err;
      let result;

      try {
        result = await login('test@example.com', 'test-undisclosed-password :-)');
      } catch (e) {
        err = e;
      }
      expect(err).toEqual(fake400);
      expect(fakeKoRequire).toBeCalledWith({
        method: 'POST',
        uri: 'FakeURI',
        body: {
          email: 'test@example.com',
          password: 'test-undisclosed-password :-)',
        },
        json: true,
      });
      expect(result).toBeUndefined();
    });
  });
});
