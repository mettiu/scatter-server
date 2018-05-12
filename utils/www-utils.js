const cp = require('child_process');

const forkServer = () => new Promise((resolve, reject) => {
  const n = cp.fork(`${__dirname}/../bin/www`);
  n.on('message', (m) => {
    if (m === 'STARTED') {
      return resolve(n);
    }
    return reject(new Error('Server not starter, problem occurred.'));
  });
});

const killServer = (process) => {
  process.kill();
};

module.exports = {
  forkServer,
  killServer,
};
