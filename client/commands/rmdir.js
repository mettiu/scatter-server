const { sendMessage } = require('../utils/send-message');
const Commander = require('../utils/commander');

const commandString = 'rmdir';

async function action(socket, folderName) {
  const ack = await sendMessage(socket, commandString, { folderName });
  // console.log(JSON.parse(ack));
  return JSON.parse(ack);
}

const command = {
  name: 'cd',
  action,
};

Commander.createCommand(command);

module.exports = command;
