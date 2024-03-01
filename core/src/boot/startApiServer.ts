import { logger } from '../config/logger';
import { vars } from '../config/vars';
import { app } from '../config/express';

const { port, env } = vars;

export const startApiServer = () => {
    app.listen(port, () => {
        logger.warn(`Core started on port ${port} (${env})`);
    });
};
