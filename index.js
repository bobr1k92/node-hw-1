const contacts = require('./contacts');
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <action>', 'choose action')
  .option('-i, --id <id>', 'user id')
  .option('-n, --name <name>', 'user name')
  .option('-e, --email <email>', 'user email')
  .option('-p, --phone <phone>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;
    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
