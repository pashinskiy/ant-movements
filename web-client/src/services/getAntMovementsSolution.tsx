import { AxiosResponse } from "axios";

import { sendHttpRequest } from "../utils/http/sendHttpRequest"

import { API_TASKS_ANT_MOVEMENTS } from "../const/apiUrl"
import { HttpRequestMethods } from "../const/HttpRequestMethods"

interface IArgs {
    params: Record<string, any>;
    callback: (data: AxiosResponse<any, any>) => void;
}

export const getAntMovementsSolution = async ({params, callback}: IArgs) => {
    const result = await sendHttpRequest({
        url: API_TASKS_ANT_MOVEMENTS,
        method: HttpRequestMethods.Get,
        headers: {},
        params,
    });

    callback(result);
}