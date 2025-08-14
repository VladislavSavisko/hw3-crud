import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  return Contact.find();
};

export const getContactById = async (id) => {
  return Contact.findById(id);
};

export const createContact = async (contactData) => {
  return Contact.create(contactData);
};

export const updateContact = async (id, updateData) => {
  return Contact.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};
