import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import { vars } from './vars';

import { onApiError, onApiNotFound } from '../utils/rest/middlewares/errorHandler';
import routes from '../rest';

const { isLocal } = vars;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors({
    origin: isLocal ? vars.webClientUrl : undefined,
    credentials: true,
}));

app.use('/api', routes);

app.use(onApiNotFound);

app.use(onApiError);

export { app };
