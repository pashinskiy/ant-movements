import { Router } from 'express';

import * as controller from './controller';
import * as schemeValidator from './scheme.validator';

const router = Router();

router.get(
    '/ant-movements',
    schemeValidator.getAntMovements,
    controller.getAntMovements,
);

export default router;
