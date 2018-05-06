
// const configPath = './config.json';
// const parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

const remote = 'http://localhost:3000';

const config = {
  http: {
    login: {
      // uri for POST http call for file announce
      uri: `${remote}/api/authentication/login`,
    },
  },
  socket: {
    uri: remote,
  },
  upload: {
    chunkSize: 4096,
  },
};

module.exports = config;

// // mantained single exports for backward compatibility
// exports.httpConfig = config.http;

// exports.socketConfig = {
//   uri: remote,
// };

exports.chunkUpload = {
  // size of the data chunk, in bytes
  size: 4096,
  message: 'chunk-upload',
};

exports.fileUpload = {
  message: 'file-upload',
};

exports.fileList = {
  message: 'file-list',
};

exports.remoteRoot = {
  message: 'get-root',
};

exports.makeDir = {
  message: 'mkdir',
};

exports.cdCommand = {
  message: 'cd',
};

exports.pwdCommand = {
  message: 'pwd',
};

exports.rmCommand = {
  message: 'rm',
};

exports.rmdirCommand = {
  message: 'rmdir',
};
