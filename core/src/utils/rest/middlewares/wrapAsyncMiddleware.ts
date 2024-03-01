import { NextFunction } from 'express';
import { IMiddleware, IRequest, IResponse } from '../../../../types/express';

export const wrapAsyncMiddleware = <PathParams, ReqBody, ResBody, QueryParams = {}>(
    middleware: IMiddleware<PathParams, ResBody, ReqBody, QueryParams>,
) => ((
    /* eslint-disable @typescript-eslint/indent */
        req: IRequest<PathParams, ResBody, ReqBody, QueryParams>,
        res: IResponse<ResBody>,
        next: NextFunction,
    ) => {
        middleware(req, res, next).catch(next);
    }
    );
