import express from 'express';
import * as contracts from './controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', authMiddleware, contracts.getContract);
router.post('/:id', authMiddleware, contracts.createContract);
router.put('/:id', authMiddleware, contracts.updateContract);
router.get('/past/:id', authMiddleware, contracts.getCampaignPastContracts);
router.get('/current/:id', authMiddleware, contracts.getCampaignCurrentContract);

export default router;
