import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import { env } from "./utils/env.js";
import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: "pino-pretty"
            }
        })
    );

    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    const PORT = Number(env("PORT", 3000));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};