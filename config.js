const fs = require('fs');

const configPath = `${__dirname}/config.json`;
const secrets = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

// We have to export each object in order to access them separately
exports.crypto = secrets.crypto;
exports.port = secrets.port;
exports.jwt = secrets.jwt;

exports.db = {
  devel: {
    connectionString: 'mongodb://192.168.1.9:27017/musiclist',
  },
  test: {
    connectionString: 'mongodb://localhost:27017/testdb',
  },
  prod: {
    connectionString: 'mongodb://localhost:27017/scatter',
  },
};
