import { ContactCollection } from "../db/models/Contact.js";

export const getContacts = async () => ContactCollection.find(); 

export const getContactById = async (contactId) => ContactCollection.findById(contactId);