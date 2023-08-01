const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

async function whiteContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((item) => item.id === contactId);

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await whiteContacts(newContacts);

  return "Contact deleted";
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
