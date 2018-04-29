const fs = require('fs');

const configPath = `${__dirname}/config.json`;
const parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

// We have to export each object in order to access them separately
exports.crypto = parsed.crypto;
exports.port = parsed.port;
exports.jwt = parsed.jwt;
