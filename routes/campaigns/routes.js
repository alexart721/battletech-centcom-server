import express from 'express';
import * as campaigns from './controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware, campaigns.getAllCampaigns);
router.post('/', authMiddleware, campaigns.createCampaign);
router.get('/:id', authMiddleware, campaigns.getCampaign);
router.put('/:id', authMiddleware, campaigns.updateCampaign);
router.get('/past', authMiddleware, campaigns.getPastCampaigns);
router.get('/current', authMiddleware, campaigns.getCurrentCampaigns);

export default router;
