import httpStatus from 'http-status';
import { ValidationError } from 'express-validation';
import { ValidationErrorItem } from 'joi';

import { sendResponse } from '../http/sendResponse';
import { logger } from '../../../config/logger';

import { ApiError } from '../../errors/ApiError';
import { CommonErrors } from '../../../const/errors/common';
import { NotFoundError } from '../../errors/CommonErrors';
import { INextFunction, IRequest, IResponse } from '../../../../types/express';

function processError(err: Error) {
    if (err instanceof ApiError) {
        return err;
    }

    if (err instanceof ValidationError) {
        const errors: any[] = [];
        Object.values(err.details).map((error) => {
            errors.push(...error.map((e: ValidationErrorItem) => ({
                code: e.type,
                message: e.message,
                field: e.context?.key,
            })));
        });
        return {
            status: httpStatus.UNPROCESSABLE_ENTITY,
            errors,
        };
    }

    return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        errors: [CommonErrors.service],
    };
}

function logError(err: Error, req: IRequest<any, any, any, any>) {
    const body = typeof req.body === 'object' && { ...req.body };
    const reqData = {
        url: req.originalUrl,
        method: req.method,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        headers: req.headers,
        body,
    };

    logger.info(
        `\t*1.Stack*:\n\t${err.stack}`
        + `\n\t*2.Req data*:\n${JSON.stringify(reqData, null, '   ')}`
        + `\n\t*3.Message*:\n\t${err.message}\n`,
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function onApiError(
    err: Error,
    req: IRequest<any, any, any, any>,
    res: IResponse<any>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: INextFunction,
) {
    const error = processError(err);

    const isInternal = error.status === httpStatus.INTERNAL_SERVER_ERROR;
    if (isInternal) {
        logError(err, req);
    }

    await sendResponse(res, error.status, { errors: error.errors });
}

export function onApiNotFound(
    req: IRequest<any, any, any, any>,
    res: IResponse<any>,
    next: INextFunction,
) {
    const err = new NotFoundError();
    return onApiError(err, req, res, next);
}
