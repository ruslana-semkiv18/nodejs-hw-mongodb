import { ContactCollection } from "../db/models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc"}) => {
    const skip = (page - 1) * perPage;
    const data = await ContactCollection.find().skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const totalItems = await ContactCollection.countDocuments();
    const paginationData = calculatePaginationData({ totalItems, page, perPage });

    return {
        data,
        ...paginationData,
    };
};

export const getContactById = async (contactId) => {
    return await ContactCollection.findById(contactId);
};

export const addContact = async (payload) => {
    return await ContactCollection.create(payload);
};

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate({ _id: contactId }, payload, {
        ...options,
        includeResultMetadata: true,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted)
    };
};

export const deleteContact = async (contactId) => {
  return await ContactCollection.findOneAndDelete({ _id: contactId });
};