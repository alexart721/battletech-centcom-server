import express from 'express';
import * as ops from './controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', authMiddleware, ops.getOperation);
router.post('/:id', authMiddleware, ops.createOperation);
router.put('/:id', authMiddleware, ops.updateOperation);
router.get('/past/:id', authMiddleware, ops.getContractPastOp);
router.get('/current/:id', authMiddleware, ops.getContractCurrentOp);

export default router;
