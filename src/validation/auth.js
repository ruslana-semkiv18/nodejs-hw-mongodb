import Joi from "joi";

import { emailRegexp } from "../constants/users.js";

export const authRegisterSchema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});