import express from 'express';
import * as mechs from './controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.post('/', authMiddleware, mechs.createMech);
router.get('/', authMiddleware, mechs.getAllMechs);
router.get('/:id', authMiddleware, mechs.getMech);
router.get('/assigned/:id', authMiddleware, mechs.getAssignedMech);
router.post('/assign/:id', authMiddleware, mechs.assignMech);

export default router;
