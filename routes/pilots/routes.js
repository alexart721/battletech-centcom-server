import express from 'express';
import * as pilots from './controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.post('/', authMiddleware, pilots.createPilot);
router.get('/', authMiddleware, pilots.getAllPilots);
router.get('/:id', authMiddleware, pilots.getPilot);
router.get('/assigned/:id', authMiddleware, pilots.getAssignedPilot);
router.post('/assign/:cid/:mid', authMiddleware, pilots.assignPilot);

export default router;
