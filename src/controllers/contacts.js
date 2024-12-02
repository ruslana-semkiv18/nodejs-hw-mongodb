import createHttpError from "http-errors";
import * as contactsServices from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const data = await contactsServices.getContacts();
    
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const data = await contactsServices.getContactById(contactId);

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
    
    const data = await contactsServices.addContact(req.body);
    
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;

    const result = await contactsServices.updateContact(contactId, req.body);

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
    const { contactId } = req.params;

    const data = await contactsServices.deleteContact(contactId);

    if (!data) {
        throw createHttpError(404, "Contact not found");
    }

    res.status(204).send();
};