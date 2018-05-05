
const loginFactory = deps =>
  async (email, password) => {
    const options = {
      method: 'POST',
      uri: deps.uri,
      body: {
        email,
        // username,
        password,
      },
      json: true,
    };
    const token = await deps.request(options);
    return token;
  };

module.exports = loginFactory;
