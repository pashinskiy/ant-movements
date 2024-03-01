import { Router } from 'express';
import tasksRoutes from './tasks/router';

const router = Router();

router.use('/tasks', tasksRoutes);

// eslint-disable-next-line import/no-default-export
export default router;
