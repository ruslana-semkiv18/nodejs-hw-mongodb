import express from "express";
import cors from "cors";
import pino from "pino-http";

import { env } from "./utils/env.js";
import { getContacts, getContactById } from "./services/contacts.js";

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(
        pino({
            transport: {
                target: "pino-pretty"
            }
        })
    );
        
    app.get("/contacts", async (req, res) => {
        const data = await getContacts();
        
        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
    });

    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;
        const data = await getContactById(contactId);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Contact not found",
            });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
    });

        app.use((req, res)=> {
            res.status(404).json({
                message: "Not found",
            });
        });

        app.use((error, req, res, next)=> {
            res.status(500).json({
                message: error.message,
            });
        });

    const PORT = Number(env("PORT", 3000));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};