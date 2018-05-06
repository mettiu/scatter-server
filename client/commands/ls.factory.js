const { sendMessage } = require('../utils/send-message');

const commandString = 'file-list';

const makeLs = socket =>
  async () => {
    const data = {};
    const ack = await sendMessage(socket, commandString, data);
    // console.log(JSON.parse(ack));
    return JSON.parse(ack);
  };

module.exports = makeLs;
