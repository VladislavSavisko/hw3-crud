import Contact from '../models/contact.js';

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = "name", sortOrder = "asc", filter = {} }) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === "desc" ? -1 : 1;

  const totalItems = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    hasPreviousPage: page > 1,
    hasNextPage: page < Math.ceil(totalItems / perPage),
  };
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
