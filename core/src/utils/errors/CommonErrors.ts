import httpStatus from 'http-status';

import { ApiError } from './ApiError';
import { CommonErrors } from '../../const/errors/common';

export class NotFoundError extends ApiError {
    constructor() {
        super(httpStatus.NOT_FOUND, [CommonErrors.notFound]);
    }
}
