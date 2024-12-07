import createHttpError from "http-errors";
import * as contactsServices from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { sortByList } from "../db/models/Contact.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const { _id: userId } = req.user;

    const data = await contactsServices.getContacts({ page, perPage, sortBy, sortOrder, userId });
    
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const userId = req.user._id;
    const { contactId } = req.params;
    const data = await contactsServices.getContactById(contactId, userId);

    if (!data) {
        throw createHttpError(404, "Contact not found");
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
    
    const data = await contactsServices.addContact({...req.body, userId });
    
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const patchContactController = async (req, res) => {
    const userId = req.user._id;
    const { contactId } = req.params;

    const result = await contactsServices.updateContact(contactId, req.body, userId);

    if (!result) {
        throw createHttpError(404, "Contact not found");
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data,
    });

};

export const deleteContactController = async (req, res) => {
    const userId = req.user._id;
    const { contactId } = req.params;

    const data = await contactsServices.deleteContact(contactId, userId);

    if (!data) {
        throw createHttpError(404, "Contact not found");
    }

    res.status(204).send();
};