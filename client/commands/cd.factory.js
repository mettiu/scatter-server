const { sendMessage } = require('../utils/send-message');

const commandString = 'cd';

const makeCd = socket =>
  async (destFolderName) => {
    const data = { destFolderName };
    const ack = await sendMessage(socket, commandString, data);
    return JSON.parse(ack);
  };

module.exports = makeCd;
