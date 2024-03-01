import httpStatus from 'http-status';

import { sendResponse } from '../../../utils/rest/http/sendResponse';
import { wrapAsyncMiddleware } from '../../../utils/rest/middlewares/wrapAsyncMiddleware';
import { getSolveOfAntMovementsTask } from '../../../services/tasks/getSolveOfAntMovementsTask';

import { Responses } from '../../../types/rest/responses';
import { QueryParameters } from '../../../types/rest/query-parameters';

export const getAntMovements = wrapAsyncMiddleware<
{},
{},
Responses.IGetTasksAntMovements,
QueryParameters.IGetTasksAntMovements
>(async (req, res) => {
    const result = await getSolveOfAntMovementsTask({
        x: Number(req.query.x),
        y: Number(req.query.y),
        maxSum: Number(req.query.maxSum),
    });

    return sendResponse(res, httpStatus.OK, { result });
});
