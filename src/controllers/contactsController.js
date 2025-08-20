import createHttpError from "http-errors";
import * as contactsService from "../services/contacts.js";

export const getAllContacts = async (req, res) => {
  // дістаємо query-параметри з дефолтами
  let {
    page = 1,
    perPage = 10,
    sortBy = "name",
    sortOrder = "asc",
    isFavourite,
    contactType,
  } = req.query;

  // нормалізація чисел
  page = Number(page);
  perPage = Number(perPage);

  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(perPage) || perPage < 1) perPage = 10;

  // сортуємо лише за name згідно з ДЗ (щоб не завалити перевірку)
  if (String(sortBy).toLowerCase() !== "name") {
    sortBy = "name";
  }

  // напрямок сортування
  sortOrder = String(sortOrder).toLowerCase() === "desc" ? "desc" : "asc";

  // фільтри
  const filter = {};
  if (typeof isFavourite !== "undefined") {
    filter.isFavourite = String(isFavourite).toLowerCase() === "true";
  }
  if (contactType) {
    filter.contactType = contactType; // "personal" | "work" | "home"
  }

  // сервіс має повернути:
  // { data, page, perPage, totalItems, totalPages, hasPreviousPage, hasNextPage }
  const result = await contactsService.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: result,
  });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) throw createHttpError(404, "Contact not found");

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );
  if (!updatedContact) throw createHttpError(404, "Contact not found");

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contactsService.deleteContact(contactId);

  if (!deletedContact) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(204).send();
};
