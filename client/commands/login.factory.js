// This function creates the 'login' function.
// It's a kind of 'maker', which takes explicitely all
// the dependencies and the parameters needed by login
// and passes them over with a closure. The the real
// 'login' function (which needs own parameters) is returned.

const makeLogin = (request, uri) =>
  async (email, password) => {
    const options = {
      method: 'POST',
      uri,
      body: {
        email,
        // username,
        password,
      },
      json: true,
    };
    const token = await request(options);
    return token;
  };

module.exports = makeLogin;
