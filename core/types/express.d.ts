import { Request, Response, NextFunction } from 'express';

export interface IRequest<PathParams, ResBody, ReqBody, QueryParams>
    extends Request<PathParams, ResBody, ReqBody, QueryParams> {}

export interface IResponse<ResBody> extends Response<ResBody> {}

export interface INextFunction extends NextFunction {}

export type IMiddleware<PathParams, ResBody, ReqBody, QueryParams> = (
    req: IRequest<PathParams, ResBody, ReqBody, QueryParams>,
    res: IResponse<ResBody>,
    next: INextFunction,
) => Promise<unknown>;
