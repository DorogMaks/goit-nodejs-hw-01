const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./db/contacts.json');

async function readContacts() {
  try {
    const contactsRaw = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(contactsRaw);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function writeContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  await readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const result = await contacts.find((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const updateContacts = contacts.filter((contact) => contact.id !== contactId);
  await writeContacts(updateContacts);
}

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(5), name, email, phone };

  const contacts = await readContacts();
  contacts.push(newContact);

  await writeContacts(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
