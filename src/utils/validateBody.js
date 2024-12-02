import createHttpError from "http-errors";

const validateBody = schema => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        }
        catch (error) {
            return next(createHttpError(400, error.message));
        }
    };
};

export default validateBody;