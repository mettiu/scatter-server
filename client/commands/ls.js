const { sendMessage } = require('../utils/send-message');
const Commander = require('../utils/commander');

const commandString = 'file-list';

async function action(socket) {
  const data = {};
  const ack = await sendMessage(socket, commandString, data);
  // console.log(JSON.parse(ack));
  return JSON.parse(ack);
}

const command = {
  name: 'ls',
  action,
};

Commander.createCommand(command);

module.exports = command;
