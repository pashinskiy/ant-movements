import Joi from 'joi';
import { validate } from 'express-validation';

export const getAntMovements: any = validate({
    query: Joi.object({
        x: Joi.number().integer().min(0).required(),
        y: Joi.number().integer().min(0).required(),
        maxSum: Joi.number()
            .integer()
            .min(0)
            .max(30)
            .required(),
    }),
});
