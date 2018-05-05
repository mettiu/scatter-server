const login = require('./login');
const sniff = require('supersniff');

login('mettiu@gmail.com', 'mettiu')
  .then(sniff)
  .catch(sniff);
