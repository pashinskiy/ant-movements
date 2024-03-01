import { IRoute } from "../utils/routing";
import * as PAGES from "../pages";
import { ANT_MOVEMENTS } from "../const/clientUrl";

export const routes: IRoute[] = [
    {
        path: ANT_MOVEMENTS,
        element: <PAGES.AntMovements />,
        default: true,
    },
];
