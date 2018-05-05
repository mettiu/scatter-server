const request = require('request-promise-native');
const config = require('../config');

const { uri } = config.http.login;

module.exports = require('./login-factory')({ request, uri });


// const rp = require('request-promise-native');
// const Commander = require('../utils/commander');

// async function action(uri, username, password) {
//   const options = {
//     method: 'POST',
//     uri,
//     body: {
//       // email: 'mettiu@gmail.com',
//       username,
//       password,
//     },
//     json: true,
//   };

//   const token = await rp(options);
//   return token;
// }

// const command = {
//   name: 'login',
//   action,
// };

// Commander.createCommand(command);

// module.exports = command;
